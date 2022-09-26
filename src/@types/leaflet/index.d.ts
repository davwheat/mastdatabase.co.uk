import * as L from 'leaflet'

export interface IFullScreenOptions {
  /**
   * The position to show the fullscreen button on the map.
   */
  position: L.ControlPosition
  /**
   * The title attribute for the button when not in fullscreen.
   *
   * @see {@link IFullScreenOptions.titleCancel}
   */
  title: string
  /**
   * The title attribute for the button when in fullscreen.
   *
   * @see {@link IFullScreenOptions.title}
   */
  titleCancel: string
  /**
   * The content of the fullscreen button. Must be `null` or an HTML string.
   *
   * Set to `null` to render an SVG fullscreen icon.
   */
  content: null | string
  /**
   * Render the zoom button outside of the container used for zoom controls.
   *
   * This may be needed for things like leaflet-react to prevent issues when
   * re-rendering components.
   */
  forceSeparateButton: boolean
  /**
   * Always use the pseudo fullscreen option.
   *
   * Pseudo-fullscreen is a fallback for browsers that do not support the Fullscreen
   * API, such as iPhones.
   */
  forcePseudoFullscreen: boolean
  /**
   * Use another element for fullscreen instead of the map's container.
   *
   * This may be handy if you have another container where modals or other overlay
   * elements are drawn on top of the map, so that they show up as expected in
   * fullscreen mode.
   */
  fullscreenElement: HTMLElement | false
}

declare module 'leaflet' {
  function fullScreen(options?: Partial<IFullScreenOptions>): L.Control.FullScreen

  interface LeafletEventHandlerFnMap {
    enterFullscreen?: LeafletEventHandlerFn
    exitFullscreen?: LeafletEventHandlerFn
  }

  interface MapOptions {
    /**
     * Adds a fullscreen control to the map at instantiation.
     */
    fullScreenControl?: boolean
    /**
     * Options for the fullscreen control added to the map at instantiation
     * if `fullscreenControl` is `true`.
     */
    fullScreenControlOptions?: IFullScreenOptions
  }

  namespace Control {
    class FullScreen extends L.Control {
      /**
       * Instantiate a new instance of the FullScreen control.
       */
      constructor(options?: Partial<IFullScreenOptions>)

      /**
       * Options set for this FullScreen control.
       */
      options: IFullScreenOptions

      /**
       * @private
       */
      _container?: HTMLElement
      /**
       * @private
       */
      _map?: L.Map

      /**
       * @private
       */
      _link?: HTMLAnchorElement

      /**
       * Whether the FullScreen control will use the proper FullScreen API.
       *
       * This is affected by the {@link IFullScreenOptions.forcePseudoFullscreen} option.
       */
      willUseFullscreen(): boolean

      /**
       * Toggle the fullscreen state of the map which this control is attached to.
       */
      toggleFullScreen(): void

      /**
       * This is a part of `leaflet.fullscreen2`'s internal API and should not be used in
       * your code.
       *
       * @private
       */
      _createButton(
        title: string,
        className: string,
        content: string | null,
        container: HTMLElement,
        onClick: L.DomEvent.EventHandlerFn,
        context: L.Control.FullScreen,
      ): HTMLAnchorElement
      /**
       * This is a part of `leaflet.fullscreen2`'s internal API and should not be used in
       * your code.
       *
       * @private
       */
      _handleFullscreenChange(): void
      /**
       * This is a part of `leaflet.fullscreen2`'s internal API and should not be used in
       * your code.
       *
       * @private
       */
      _toggleState(): void
    }
  }

  namespace Map {
    /**
     * **If the FullScreen control is present on the map**, toggle the map's fullscreen state.
     */
    function toggleFullscreen(): void
  }

  interface Map {
    /**
     * @private
     */
    _exitFired: boolean

    /**
     * Whether the map is in fullscreen mode or not.
     *
     * This attribute will only be present if a {@link L.Control.FullScreen} control is
     * attached to the map.
     */
    isFullscreen?: boolean
    /**
     * Instance of {@link L.Control.FullScreen}, if the control is attached to the map.
     */
    fullScreenControl?: L.Control.FullScreen
  }
}
