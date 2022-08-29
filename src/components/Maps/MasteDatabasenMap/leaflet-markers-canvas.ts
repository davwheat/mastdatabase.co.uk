import DataMarker from '@leaflet/DataMarker'
import L, { Map as MapType } from 'leaflet'
import RBush from 'rbush'

type DataMarkerAny = DataMarker<{ id: string | number; [k: string]: any }>

interface RBushItem {
  minX: number
  minY: number
  maxX: number
  maxY: number
  marker: DataMarkerAny
}

const markersCanvas = {
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // private: properties
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  _map: null as MapType | null,
  _canvas: null as HTMLCanvasElement | null,
  _context: null as CanvasRenderingContext2D | null,

  // leaflet markers (used to getBounds)
  _markers: [] as DataMarkerAny[],

  // visible markers
  _markersTree: new RBush<RBushItem>(),

  // every marker positions (even out of the canvas)
  _positionsTree: new RBush<RBushItem>(),

  // icon images index
  _icons: {} as Record<string, any>,

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // public: global
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  addTo(map: MapType) {
    map.addLayer(this as any)

    return this
  },

  getBounds() {
    if (this._markers.length === 0) return null

    const bounds = this._markers[0].getLatLng().toBounds(0)

    this._markers.forEach(marker => {
      bounds.extend(marker.getLatLng())
    })

    return bounds
  },

  redraw() {
    this._redraw(true)
  },

  clear() {
    this._positionsTree = new RBush()
    this._markersTree = new RBush()
    this._markers = []
    this._redraw(true)
  },

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // public: markers
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  addMarker(marker: DataMarkerAny) {
    const { markerBox, positionBox, isVisible } = this._addMarker(marker)

    if (!markerBox) return

    if (markerBox && isVisible) {
      this._markersTree.insert(markerBox)
    }

    if (positionBox) {
      this._positionsTree.insert(positionBox)
    }
  },

  // add multiple markers (better for rBush performance)
  addMarkers(markers: DataMarkerAny[]) {
    const markerBoxes: RBushItem[] = []
    const positionBoxes: RBushItem[] = []

    markers.forEach(marker => {
      const { markerBox, positionBox, isVisible } = this._addMarker(marker)

      if (markerBox && isVisible) {
        markerBoxes.push(markerBox)
      }

      if (positionBox) {
        positionBoxes.push(positionBox)
      }
    })

    this._markersTree.load(markerBoxes)
    this._positionsTree.load(positionBoxes)
  },

  removeMarker(marker: DataMarkerAny) {
    const latLng = marker.getLatLng()
    const isVisible = this._map!.getBounds().contains(latLng)

    const positionBox = {
      minX: latLng.lng,
      minY: latLng.lat,
      maxX: latLng.lng,
      maxY: latLng.lat,
      marker,
    }

    this._markers = this._markers.filter(m => m.data.id !== marker.data.id)

    this._positionsTree.remove(positionBox, (a, b) => {
      return a.marker.data.id === b.marker.data.id
    })

    this._markersTree.remove(positionBox, (a, b) => {
      return a.marker.data.id === b.marker.data.id
    })

    if (isVisible) {
      this._redraw(true)
    }
  },

  // remove multiple markers (better for rBush performance)
  removeMarkers(markers: DataMarkerAny[]) {
    let hasChanged = false

    markers.forEach(marker => {
      const latLng = marker.getLatLng()
      const isVisible = this._map!.getBounds().contains(latLng)

      const positionBox = {
        minX: latLng.lng,
        minY: latLng.lat,
        maxX: latLng.lng,
        maxY: latLng.lat,
        marker,
      }

      this._markers = this._markers.filter(m => m.data.id !== marker.data.id)

      this._positionsTree.remove(positionBox, (a, b) => {
        return a.marker.data.id === b.marker.data.id
      })

      this._markersTree.remove(positionBox, (a, b) => {
        return a.marker.data.id === b.marker.data.id
      })

      if (isVisible) {
        hasChanged = true
      }
    })

    if (hasChanged) {
      this._redraw(true)
    }
  },

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // leaflet: default methods
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  initialize(options: any) {
    L.Util.setOptions(this, options)
  },

  // called by Leaflet on `map.addLayer`
  onAdd(map: MapType) {
    this._map = map
    this._initCanvas()
    this.getPane().appendChild(this._canvas)

    map.on('moveend', this._reset, this)
    map.on('resize', this._reset, this)

    map.on('click', this._fire, this)
    map.on('mousemove', this._fire, this)

    if (map._zoomAnimated) {
      map.on('zoomanim', this._animateZoom, this)
    }
  },

  // called by Leaflet
  onRemove(map: MapType) {
    this.getPane().removeChild(this._canvas)

    map.off('click', this._fire, this)
    map.off('mousemove', this._fire, this)
    map.off('moveend', this._reset, this)
    map.off('resize', this._reset, this)

    if (map._zoomAnimated) {
      map.off('zoomanim', this._animateZoom, this)
    }
  },

  setOptions(options: any) {
    L.Util.setOptions(this, options)

    return this.redraw()
  },

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // private: global methods
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  _initCanvas() {
    const { x, y } = this._map!.getSize()
    const isAnimated = this._map!.options.zoomAnimation && L.Browser.any3d

    this._canvas = L.DomUtil.create('canvas', 'leaflet-markers-canvas-layer leaflet-layer')
    this._canvas.width = x
    this._canvas.height = y
    this._context = this._canvas.getContext('2d')

    L.DomUtil.addClass(this._canvas, `leaflet-zoom-${isAnimated ? 'animated' : 'hide'}`)
  },

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // private: marker methods
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  _addMarker(marker: DataMarkerAny) {
    if (marker.options.pane !== 'markerPane' || !marker.options.icon) {
      console.error('This is not a marker', marker)

      return { markerBox: null, positionBox: null, isVisible: null }
    }

    // @ts-expect-error protected
    // required for pop-up and tooltip
    marker._map = this._map

    // add _leaflet_id property
    L.Util.stamp(marker)

    const latLng = marker.getLatLng()
    const isVisible = this._map!.getBounds().contains(latLng)
    const { x, y } = this._map!.latLngToContainerPoint(latLng)
    const { iconSize, iconAnchor } = marker.options.icon.options

    const markerBox = {
      minX: x - iconAnchor[0],
      minY: y - iconAnchor[1],
      maxX: x + iconSize[0] - iconAnchor[0],
      maxY: y + iconSize[1] - iconAnchor[1],
      marker,
    }

    const positionBox = {
      minX: latLng.lng,
      minY: latLng.lat,
      maxX: latLng.lng,
      maxY: latLng.lat,
      marker,
    }

    if (isVisible) {
      this._drawMarker(marker, { x, y })
    }

    this._markers.push(marker)

    return { markerBox, positionBox, isVisible }
  },

  _drawMarker(marker: DataMarkerAny, { x, y }: { x: number; y: number }) {
    const { iconUrl } = marker.options.icon?.options

    if (marker.image) {
      this._drawImage(marker, { x, y })
    } else if (this._icons[iconUrl]) {
      marker.image = this._icons[iconUrl].image

      if (this._icons[iconUrl].isLoaded) {
        this._drawImage(marker, { x, y })
      } else {
        this._icons[iconUrl].elements.push({ marker, x, y })
      }
    } else {
      const image = new Image()
      image.src = iconUrl
      marker.image = image

      this._icons[iconUrl] = {
        image,
        isLoaded: false,
        elements: [{ marker, x, y }],
      }

      image.onload = () => {
        this._icons[iconUrl].isLoaded = true
        this._icons[iconUrl].elements.forEach(({ marker, x, y }: { marker: DataMarkerAny; x: number; y: number }) => {
          this._drawImage(marker, { x, y })
        })
      }
    }

    this._drawText(marker, { x, y })
  },

  _drawImage(marker: DataMarkerAny, { x, y }: { x: number; y: number }) {
    const { rotationAngle, iconAnchor, iconSize } = marker.options.icon?.options
    const angle = rotationAngle || 0

    this._context!.save()
    this._context!.translate(x, y)
    this._context!.rotate((angle * Math.PI) / 180)
    this._context!.drawImage(marker.image, -iconAnchor[0], -iconAnchor[1], iconSize[0], iconSize[1])
    this._context!.restore()
  },

  _drawText(marker: DataMarkerAny, { x, y }: { x: number; y: number }) {
    const { text } = marker.options

    if (text) {
      const lines: string[] = text.split('\n')

      this._context!.save()
      this._context!.font = '13px/1 Jost'
      this._context!.textAlign = 'center'
      this._context!.textBaseline = 'top'

      const bgPad = 4
      const yOffset = 8

      const bounds = {
        top: -0,
        left: -0,
        right: 0,
        bottom: 0,
      }

      lines.forEach((l, i, arr) => {
        const metrics = this._context!.measureText(l)

        if (i === 0) {
          bounds.top = -metrics.actualBoundingBoxAscent
        }

        const left = -metrics.actualBoundingBoxLeft

        if (left < bounds.left) {
          bounds.left = left
        }

        const right = metrics.actualBoundingBoxRight

        if (right > bounds.right) {
          bounds.right = right
        }

        bounds.bottom += 14
      })

      const center = [(bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2]
      const dimens = [-bounds.left + bounds.right, -bounds.top + bounds.bottom]

      this._context!.translate(x + center[0], y + 9 + yOffset)

      const rectParams: [number, number, number, number] = [-dimens[0] / 2 - bgPad, -bgPad, dimens[0] + bgPad * 2, dimens[1] + bgPad * 1.3]

      this._context!.fillStyle = '#fff'
      this._context!.fillRect(...rectParams)

      this._context!.strokeStyle = '#000'
      this._context!.strokeRect(...rectParams)

      this._context!.fillStyle = '#000'

      lines.forEach((l, i) => {
        this._context!.fillText(l, 0, i * 14)
      })

      this._context!.restore()
    }
  },

  _redraw(clear: boolean = false) {
    if (clear) {
      this._context!.clearRect(0, 0, this._canvas!.width, this._canvas!.height)
    }

    if (!this._map || !this._positionsTree) return

    const mapBounds = this._map.getBounds()
    const mapBoundsBox = {
      minX: mapBounds.getWest(),
      minY: mapBounds.getSouth(),
      maxX: mapBounds.getEast(),
      maxY: mapBounds.getNorth(),
    }

    // draw only visible markers
    const markers: RBushItem[] = []
    this._positionsTree.search(mapBoundsBox).forEach(({ marker }) => {
      const latLng = marker.getLatLng()
      const { x, y } = this._map!.latLngToContainerPoint(latLng)
      const { iconSize, iconAnchor } = marker.options.icon?.options

      const markerBox = {
        minX: x - iconAnchor[0],
        minY: y - iconAnchor[1],
        maxX: x + iconSize[0] - iconAnchor[0],
        maxY: y + iconSize[1] - iconAnchor[1],
        marker,
      }

      markers.push(markerBox)
      this._drawMarker(marker, { x, y })
    })

    this._markersTree.clear()
    this._markersTree.load(markers)
  },

  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  //
  // private: event methods
  //
  // * * * * * * * * * * * * * * * * * * * * * * * * * * * *

  _reset() {
    const topLeft = this._map!.containerPointToLayerPoint([0, 0])
    L.DomUtil.setPosition(this._canvas!, topLeft)

    const { x, y } = this._map!.getSize()
    this._canvas!.width = x
    this._canvas!.height = y

    this._redraw()
  },

  _fire(event: any) {
    if (!this._markersTree) return

    const { x, y } = event.containerPoint
    const markers = this._markersTree.search({
      minX: x,
      minY: y,
      maxX: x,
      maxY: y,
    })

    if (markers && markers.length) {
      this._map!._container.style.cursor = 'pointer'
      const marker = markers[0].marker

      if (event.type === 'click') {
        if (marker.listens('click')) {
          marker.fire('click')
        }
      }

      if (event.type === 'mousemove') {
        if (this._mouseOverMarker && this._mouseOverMarker !== marker) {
          if (this._mouseOverMarker.listens('mouseout')) {
            this._mouseOverMarker.fire('mouseout')
          }
        }

        if (!this._mouseOverMarker || this._mouseOverMarker !== marker) {
          this._mouseOverMarker = marker
          if (marker.listens('mouseover')) {
            marker.fire('mouseover')
          }
        }
      }
    } else {
      this._map!._container.style.cursor = ''
      if (event.type === 'mousemove' && this._mouseOverMarker) {
        if (this._mouseOverMarker.listens('mouseout')) {
          this._mouseOverMarker.fire('mouseout')
        }

        delete this._mouseOverMarker
      }
    }
  },

  _animateZoom(event: any) {
    const scale = this._map!.getZoomScale(event.zoom)
    const offset = this._map!._latLngBoundsToNewLayerBounds(this._map!.getBounds(), event.zoom, event.center).min

    L.DomUtil.setTransform(this._canvas!, offset, scale)
  },
}

L.MarkersCanvas = L.Layer.extend(markersCanvas)
