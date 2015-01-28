!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.DownloadButton=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var React = require('react/addons')
  , cx = React.addons.classSet
  , PT = React.PropTypes

  , saveAs = require('./save-as')

var DownloadButton = React.createClass({displayName: "DownloadButton",
  propTypes: {
    fileData: PT.object,
    genFile: PT.func,
    async: PT.bool,
    generateTitle: PT.string,
    downloadTitle: PT.oneOfType([PT.string, PT.func]),
    loadingTitle: PT.string,
    onDownloaded: PT.func,
  },

  getDefaultProps: function () {
    return {
      async: false,
      downloadTitle: 'Download',
      generateTitle: 'Generate file',
      loadingTitle: 'Loading...',
    }
  },

  getInitialState: function () {
    return {
      loading: false,
      fileData: null,
    }
  },

  _onGenerate: function () {
    this.setState({loading: true, fileData: null})
    this.props.genFile(this._donePreparing)
  },

  _donePreparing: function (fileData) {
    this.setState({
      loading: false,
      fileData: fileData,
    })
  },

  _onDownload: function () {
    var fileData = this.props.fileData || (this.props.async ? this.state.fileData : this.props.genFile())
    if (!fileData) {
      return false
    }
    var blob = new Blob([fileData.contents], {type: fileData.mime})
      , url = URL.createObjectURL(blob)
    saveAs(url, fileData.filename)
    this.props.onDownloaded && this.props.onDownloaded()
  },

  render: function () {
    // need one or the other
    if (!this.props.genFile && !this.props.fileData) {
      return React.createElement("em", null, "Invalid configuration for download button")
    }
    var style = this.props.style
      , cls = 'DownloadButton ' + (this.props.className || '')

    if (this.props.fileData || !this.props.async || this.state.fileData) {
      var title = this.props.downloadTitle
      if ('function' === typeof title) {
        title = title(this.props.fileData || this.state.fileData)
      }
      return React.createElement("button", {style: style, onClick: this._onDownload, className: cls}, 
        title
      )
    }

    if (this.state.loading) {
      return React.createElement("button", {style: style, className: cls + ' DownloadButton-loading'}, 
        this.props.loadingTitle
      )
    }

    return React.createElement("button", {style: style, onClick: this._onGenerate, className: cls + ' DownloadButton-generate'}, 
      this.props.generateTitle
    )
  }
})

module.exports = DownloadButton




},{"./save-as":2,"react/addons":"react/addons"}],2:[function(require,module,exports){

module.exports = saveAs

// from http://stackoverflow.com/questions/283956/
function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.download = filename;
    link.href = uri;
    link.click();
    document.body.removeChild(link); //remove the link when done
  } else {
    location.replace(uri);
  }
}




},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy5udm0vdjAuMTAuMzMvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qYXJlZC9jbG9uZS9ubS9kb3dubG9hZGJ1dHRvbi9pbmRleC5qcyIsIi9ob21lL2phcmVkL2Nsb25lL25tL2Rvd25sb2FkYnV0dG9uL3NhdmUtYXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDL0IsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUM5QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUzs7QUFFeEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7QUFFakMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0I7RUFDbkUsU0FBUyxFQUFFO0lBQ1QsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNO0lBQ25CLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSTtJQUNoQixLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUk7SUFDZCxhQUFhLEVBQUUsRUFBRSxDQUFDLE1BQU07SUFDeEIsYUFBYSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxZQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU07SUFDdkIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJO0FBQ3pCLEdBQUc7O0VBRUQsZUFBZSxFQUFFLFlBQVksQ0FBQztJQUM1QixPQUFPO01BQ0wsS0FBSyxFQUFFLEtBQUs7TUFDWixhQUFhLEVBQUUsVUFBVTtNQUN6QixhQUFhLEVBQUUsZUFBZTtNQUM5QixZQUFZLEVBQUUsWUFBWTtLQUMzQjtBQUNMLEdBQUc7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Q0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLDBCQUEwQixDQUFDO01BQ3pILElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtLQUN6QjtHQUNGO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYztBQUMvQjs7QUFFQTs7O0FDMUZBO0FBQ0EsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOztBQUV2QixrREFBa0Q7QUFDbEQsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDO0VBQzlCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkMsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO0lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pDLE1BQU07SUFDTCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3ZCO0FBQ0gsQ0FBQztBQUNEOztBQUVBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJylcbiAgLCBjeCA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldFxuICAsIFBUID0gUmVhY3QuUHJvcFR5cGVzXG5cbiAgLCBzYXZlQXMgPSByZXF1aXJlKCcuL3NhdmUtYXMnKVxuXG52YXIgRG93bmxvYWRCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiRG93bmxvYWRCdXR0b25cIixcbiAgcHJvcFR5cGVzOiB7XG4gICAgZmlsZURhdGE6IFBULm9iamVjdCxcbiAgICBnZW5GaWxlOiBQVC5mdW5jLFxuICAgIGFzeW5jOiBQVC5ib29sLFxuICAgIGdlbmVyYXRlVGl0bGU6IFBULnN0cmluZyxcbiAgICBkb3dubG9hZFRpdGxlOiBQVC5vbmVPZlR5cGUoW1BULnN0cmluZywgUFQuZnVuY10pLFxuICAgIGxvYWRpbmdUaXRsZTogUFQuc3RyaW5nLFxuICAgIG9uRG93bmxvYWRlZDogUFQuZnVuYyxcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgZG93bmxvYWRUaXRsZTogJ0Rvd25sb2FkJyxcbiAgICAgIGdlbmVyYXRlVGl0bGU6ICdHZW5lcmF0ZSBmaWxlJyxcbiAgICAgIGxvYWRpbmdUaXRsZTogJ0xvYWRpbmcuLi4nLFxuICAgIH1cbiAgfSxcblxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBmaWxlRGF0YTogbnVsbCxcbiAgICB9XG4gIH0sXG5cbiAgX29uR2VuZXJhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtsb2FkaW5nOiB0cnVlLCBmaWxlRGF0YTogbnVsbH0pXG4gICAgdGhpcy5wcm9wcy5nZW5GaWxlKHRoaXMuX2RvbmVQcmVwYXJpbmcpXG4gIH0sXG5cbiAgX2RvbmVQcmVwYXJpbmc6IGZ1bmN0aW9uIChmaWxlRGF0YSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBmaWxlRGF0YTogZmlsZURhdGEsXG4gICAgfSlcbiAgfSxcblxuICBfb25Eb3dubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIHZhciBmaWxlRGF0YSA9IHRoaXMucHJvcHMuZmlsZURhdGEgfHwgKHRoaXMucHJvcHMuYXN5bmMgPyB0aGlzLnN0YXRlLmZpbGVEYXRhIDogdGhpcy5wcm9wcy5nZW5GaWxlKCkpXG4gICAgaWYgKCFmaWxlRGF0YSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2ZpbGVEYXRhLmNvbnRlbnRzXSwge3R5cGU6IGZpbGVEYXRhLm1pbWV9KVxuICAgICAgLCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgc2F2ZUFzKHVybCwgZmlsZURhdGEuZmlsZW5hbWUpXG4gICAgdGhpcy5wcm9wcy5vbkRvd25sb2FkZWQgJiYgdGhpcy5wcm9wcy5vbkRvd25sb2FkZWQoKVxuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIC8vIG5lZWQgb25lIG9yIHRoZSBvdGhlclxuICAgIGlmICghdGhpcy5wcm9wcy5nZW5GaWxlICYmICF0aGlzLnByb3BzLmZpbGVEYXRhKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImVtXCIsIG51bGwsIFwiSW52YWxpZCBjb25maWd1cmF0aW9uIGZvciBkb3dubG9hZCBidXR0b25cIilcbiAgICB9XG4gICAgdmFyIHN0eWxlID0gdGhpcy5wcm9wcy5zdHlsZVxuICAgICAgLCBjbHMgPSAnRG93bmxvYWRCdXR0b24gJyArICh0aGlzLnByb3BzLmNsYXNzTmFtZSB8fCAnJylcblxuICAgIGlmICh0aGlzLnByb3BzLmZpbGVEYXRhIHx8ICF0aGlzLnByb3BzLmFzeW5jIHx8IHRoaXMuc3RhdGUuZmlsZURhdGEpIHtcbiAgICAgIHZhciB0aXRsZSA9IHRoaXMucHJvcHMuZG93bmxvYWRUaXRsZVxuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB0aXRsZSkge1xuICAgICAgICB0aXRsZSA9IHRpdGxlKHRoaXMucHJvcHMuZmlsZURhdGEgfHwgdGhpcy5zdGF0ZS5maWxlRGF0YSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHtzdHlsZTogc3R5bGUsIG9uQ2xpY2s6IHRoaXMuX29uRG93bmxvYWQsIGNsYXNzTmFtZTogY2xzfSwgXG4gICAgICAgIHRpdGxlXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3RhdGUubG9hZGluZykge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge3N0eWxlOiBzdHlsZSwgY2xhc3NOYW1lOiBjbHMgKyAnIERvd25sb2FkQnV0dG9uLWxvYWRpbmcnfSwgXG4gICAgICAgIHRoaXMucHJvcHMubG9hZGluZ1RpdGxlXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwge3N0eWxlOiBzdHlsZSwgb25DbGljazogdGhpcy5fb25HZW5lcmF0ZSwgY2xhc3NOYW1lOiBjbHMgKyAnIERvd25sb2FkQnV0dG9uLWdlbmVyYXRlJ30sIFxuICAgICAgdGhpcy5wcm9wcy5nZW5lcmF0ZVRpdGxlXG4gICAgKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvd25sb2FkQnV0dG9uXG5cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhKaGJuTm1iM0p0WldRdWFuTWlMQ0p6YjNWeVkyVnpJanBiSWk5b2IyMWxMMnBoY21Wa0wyTnNiMjVsTDI1dEwyUnZkMjVzYjJGa1luVjBkRzl1TDJsdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk8wRkJRMEVzU1VGQlNTeExRVUZMTEVkQlFVY3NUMEZCVHl4RFFVRkRMR05CUVdNc1EwRkJRenRKUVVNdlFpeEZRVUZGTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJReXhSUVVGUk8wRkJRemxDTEVsQlFVa3NSVUZCUlN4SFFVRkhMRXRCUVVzc1EwRkJReXhUUVVGVE96dEJRVVY0UWl4SlFVRkpMRTFCUVUwc1IwRkJSeXhQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZET3p0QlFVVnFReXhKUVVGSkxHOURRVUZ2UXl3NFFrRkJRVHRGUVVOMFF5eFRRVUZUTEVWQlFVVTdTVUZEVkN4UlFVRlJMRVZCUVVVc1JVRkJSU3hEUVVGRExFMUJRVTA3U1VGRGJrSXNUMEZCVHl4RlFVRkZMRVZCUVVVc1EwRkJReXhKUVVGSk8wbEJRMmhDTEV0QlFVc3NSVUZCUlN4RlFVRkZMRU5CUVVNc1NVRkJTVHRKUVVOa0xHRkJRV0VzUlVGQlJTeEZRVUZGTEVOQlFVTXNUVUZCVFR0SlFVTjRRaXhoUVVGaExFVkJRVVVzUlVGQlJTeERRVUZETEZOQlFWTXNRMEZCUXl4RFFVRkRMRVZCUVVVc1EwRkJReXhOUVVGTkxFVkJRVVVzUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJwRUxGbEJRVmtzUlVGQlJTeEZRVUZGTEVOQlFVTXNUVUZCVFR0SlFVTjJRaXhaUVVGWkxFVkJRVVVzUlVGQlJTeERRVUZETEVsQlFVazdRVUZEZWtJc1IwRkJSenM3UlVGRlJDeGxRVUZsTEVWQlFVVXNXVUZCV1N4RFFVRkRPMGxCUXpWQ0xFOUJRVTg3VFVGRFRDeExRVUZMTEVWQlFVVXNTMEZCU3p0TlFVTmFMR0ZCUVdFc1JVRkJSU3hWUVVGVk8wMUJRM3BDTEdGQlFXRXNSVUZCUlN4bFFVRmxPMDFCUXpsQ0xGbEJRVmtzUlVGQlJTeFpRVUZaTzB0QlF6TkNPMEZCUTB3c1IwRkJSenM3UlVGRlJDeGxRVUZsTEVWQlFVVXNXVUZCV1N4RFFVRkRPMGxCUXpWQ0xFOUJRVTg3VFVGRFRDeFBRVUZQTEVWQlFVVXNTMEZCU3p0TlFVTmtMRkZCUVZFc1JVRkJSU3hKUVVGSk8wdEJRMlk3UVVGRFRDeEhRVUZIT3p0RlFVVkVMRmRCUVZjc1JVRkJSU3haUVVGWkxFTkJRVU03U1VGRGVFSXNTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFOUJRVThzUlVGQlJTeEpRVUZKTEVWQlFVVXNVVUZCVVN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRemxETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTTdRVUZETTBNc1IwRkJSenM3UlVGRlJDeGpRVUZqTEVWQlFVVXNWVUZCVlN4UlFVRlJMRVZCUVVVc1EwRkJRenRKUVVOdVF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRPMDFCUTFvc1QwRkJUeXhGUVVGRkxFdEJRVXM3VFVGRFpDeFJRVUZSTEVWQlFVVXNVVUZCVVR0TFFVTnVRaXhEUVVGRE8wRkJRMDRzUjBGQlJ6czdSVUZGUkN4WFFVRlhMRVZCUVVVc1dVRkJXU3hEUVVGRE8wbEJRM2hDTEVsQlFVa3NVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeExRVUZMTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTeXhIUVVGSExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eEZRVUZGTEVOQlFVTTdTVUZEY2tjc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJUdE5RVU5pTEU5QlFVOHNTMEZCU3p0TFFVTmlPMGxCUTBRc1NVRkJTU3hKUVVGSkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1VVRkJVU3hEUVVGRExFVkJRVVVzUTBGQlF5eEpRVUZKTEVWQlFVVXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8xRkJRek5FTEVkQlFVY3NSMEZCUnl4SFFVRkhMRU5CUVVNc1pVRkJaU3hEUVVGRExFbEJRVWtzUTBGQlF6dEpRVU51UXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhGUVVGRkxGRkJRVkVzUTBGQlF5eFJRVUZSTEVOQlFVTTdTVUZET1VJc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFpRVUZaTEVsQlFVa3NTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJReXhaUVVGWkxFVkJRVVU3UVVGRGVFUXNSMEZCUnpzN1FVRkZTQ3hGUVVGRkxFMUJRVTBzUlVGQlJTeFpRVUZaTEVOQlFVTTdPMGxCUlc1Q0xFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNVVUZCVVN4RlFVRkZPMDFCUXk5RExFOUJRVThzYjBKQlFVRXNTVUZCUnl4RlFVRkJMRWxCUVVNc1JVRkJRU3d5UTBGQk9FTXNRMEZCUVR0TFFVTXhSRHRKUVVORUxFbEJRVWtzUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1MwRkJTenRCUVVOb1F5eFJRVUZSTEVkQlFVY3NSMEZCUnl4cFFrRkJhVUlzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRk5CUVZNc1NVRkJTU3hGUVVGRkxFTkJRVU03TzBsQlJURkVMRWxCUVVrc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eFJRVUZSTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFdEJRVXNzU1VGQlNTeEpRVUZKTEVOQlFVTXNTMEZCU3l4RFFVRkRMRkZCUVZFc1JVRkJSVHROUVVOdVJTeEpRVUZKTEV0QlFVc3NSMEZCUnl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExHRkJRV0U3VFVGRGNFTXNTVUZCU1N4VlFVRlZMRXRCUVVzc1QwRkJUeXhMUVVGTExFVkJRVVU3VVVGREwwSXNTMEZCU3l4SFFVRkhMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNTVUZCU1N4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExGRkJRVkVzUTBGQlF6dFBRVU14UkR0TlFVTkVMRTlCUVU4c2IwSkJRVUVzVVVGQlR5eEZRVUZCTEVOQlFVRXNRMEZCUXl4TFFVRkJMRVZCUVVzc1EwRkJSU3hMUVVGTExFVkJRVU1zUTBGQlF5eFBRVUZCTEVWQlFVOHNRMEZCUlN4SlFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRExFTkJRVU1zVTBGQlFTeEZRVUZUTEVOQlFVVXNSMEZCU3l4RFFVRkJMRVZCUVVFN1VVRkRja1VzUzBGQlRUdE5RVU5CTEVOQlFVRTdRVUZEWml4TFFVRkxPenRKUVVWRUxFbEJRVWtzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRVZCUVVVN1RVRkRkRUlzVDBGQlR5eHZRa0ZCUVN4UlFVRlBMRVZCUVVFc1EwRkJRU3hEUVVGRExFdEJRVUVzUlVGQlN5eERRVUZGTEV0QlFVc3NSVUZCUXl4RFFVRkRMRk5CUVVFc1JVRkJVeXhEUVVGRkxFZEJRVWNzUjBGQlJ5eDVRa0ZCTWtJc1EwRkJRU3hGUVVGQk8xRkJRM1JGTEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1dVRkJZVHROUVVOc1FpeERRVUZCTzBGQlEyWXNTMEZCU3pzN1NVRkZSQ3hQUVVGUExHOUNRVUZCTEZGQlFVOHNSVUZCUVN4RFFVRkJMRU5CUVVNc1MwRkJRU3hGUVVGTExFTkJRVVVzUzBGQlN5eEZRVUZETEVOQlFVTXNUMEZCUVN4RlFVRlBMRU5CUVVVc1NVRkJTU3hEUVVGRExGZEJRVmNzUlVGQlF5eERRVUZETEZOQlFVRXNSVUZCVXl4RFFVRkZMRWRCUVVjc1IwRkJSeXd3UWtGQk5FSXNRMEZCUVN4RlFVRkJPMDFCUTJ4SExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNZVUZCWXp0SlFVTnVRaXhEUVVGQk8wZEJRMVk3UVVGRFNDeERRVUZETEVOQlFVTTdPMEZCUlVZc1RVRkJUU3hEUVVGRExFOUJRVThzUjBGQlJ5eGpRVUZqSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaVhHNTJZWElnVW1WaFkzUWdQU0J5WlhGMWFYSmxLQ2R5WldGamRDOWhaR1J2Ym5NbktWeHVJQ0FzSUdONElEMGdVbVZoWTNRdVlXUmtiMjV6TG1Oc1lYTnpVMlYwWEc0Z0lDd2dVRlFnUFNCU1pXRmpkQzVRY205d1ZIbHdaWE5jYmx4dUlDQXNJSE5oZG1WQmN5QTlJSEpsY1hWcGNtVW9KeTR2YzJGMlpTMWhjeWNwWEc1Y2JuWmhjaUJFYjNkdWJHOWhaRUoxZEhSdmJpQTlJRkpsWVdOMExtTnlaV0YwWlVOc1lYTnpLSHRjYmlBZ2NISnZjRlI1Y0dWek9pQjdYRzRnSUNBZ1ptbHNaVVJoZEdFNklGQlVMbTlpYW1WamRDeGNiaUFnSUNCblpXNUdhV3hsT2lCUVZDNW1kVzVqTEZ4dUlDQWdJR0Z6ZVc1ak9pQlFWQzVpYjI5c0xGeHVJQ0FnSUdkbGJtVnlZWFJsVkdsMGJHVTZJRkJVTG5OMGNtbHVaeXhjYmlBZ0lDQmtiM2R1Ykc5aFpGUnBkR3hsT2lCUVZDNXZibVZQWmxSNWNHVW9XMUJVTG5OMGNtbHVaeXdnVUZRdVpuVnVZMTBwTEZ4dUlDQWdJR3h2WVdScGJtZFVhWFJzWlRvZ1VGUXVjM1J5YVc1bkxGeHVJQ0FnSUc5dVJHOTNibXh2WVdSbFpEb2dVRlF1Wm5WdVl5eGNiaUFnZlN4Y2JseHVJQ0JuWlhSRVpXWmhkV3gwVUhKdmNITTZJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdZWE41Ym1NNklHWmhiSE5sTEZ4dUlDQWdJQ0FnWkc5M2JteHZZV1JVYVhSc1pUb2dKMFJ2ZDI1c2IyRmtKeXhjYmlBZ0lDQWdJR2RsYm1WeVlYUmxWR2wwYkdVNklDZEhaVzVsY21GMFpTQm1hV3hsSnl4Y2JpQWdJQ0FnSUd4dllXUnBibWRVYVhSc1pUb2dKMHh2WVdScGJtY3VMaTRuTEZ4dUlDQWdJSDFjYmlBZ2ZTeGNibHh1SUNCblpYUkpibWwwYVdGc1UzUmhkR1U2SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnYkc5aFpHbHVaem9nWm1Gc2MyVXNYRzRnSUNBZ0lDQm1hV3hsUkdGMFlUb2diblZzYkN4Y2JpQWdJQ0I5WEc0Z0lIMHNYRzVjYmlBZ1gyOXVSMlZ1WlhKaGRHVTZJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0IwYUdsekxuTmxkRk4wWVhSbEtIdHNiMkZrYVc1bk9pQjBjblZsTENCbWFXeGxSR0YwWVRvZ2JuVnNiSDBwWEc0Z0lDQWdkR2hwY3k1d2NtOXdjeTVuWlc1R2FXeGxLSFJvYVhNdVgyUnZibVZRY21Wd1lYSnBibWNwWEc0Z0lIMHNYRzVjYmlBZ1gyUnZibVZRY21Wd1lYSnBibWM2SUdaMWJtTjBhVzl1SUNobWFXeGxSR0YwWVNrZ2UxeHVJQ0FnSUhSb2FYTXVjMlYwVTNSaGRHVW9lMXh1SUNBZ0lDQWdiRzloWkdsdVp6b2dabUZzYzJVc1hHNGdJQ0FnSUNCbWFXeGxSR0YwWVRvZ1ptbHNaVVJoZEdFc1hHNGdJQ0FnZlNsY2JpQWdmU3hjYmx4dUlDQmZiMjVFYjNkdWJHOWhaRG9nWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhaaGNpQm1hV3hsUkdGMFlTQTlJSFJvYVhNdWNISnZjSE11Wm1sc1pVUmhkR0VnZkh3Z0tIUm9hWE11Y0hKdmNITXVZWE41Ym1NZ1B5QjBhR2x6TG5OMFlYUmxMbVpwYkdWRVlYUmhJRG9nZEdocGN5NXdjbTl3Y3k1blpXNUdhV3hsS0NrcFhHNGdJQ0FnYVdZZ0tDRm1hV3hsUkdGMFlTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sWEc0Z0lDQWdmVnh1SUNBZ0lIWmhjaUJpYkc5aUlEMGdibVYzSUVKc2IySW9XMlpwYkdWRVlYUmhMbU52Ym5SbGJuUnpYU3dnZTNSNWNHVTZJR1pwYkdWRVlYUmhMbTFwYldWOUtWeHVJQ0FnSUNBZ0xDQjFjbXdnUFNCVlVrd3VZM0psWVhSbFQySnFaV04wVlZKTUtHSnNiMklwWEc0Z0lDQWdjMkYyWlVGektIVnliQ3dnWm1sc1pVUmhkR0V1Wm1sc1pXNWhiV1VwWEc0Z0lDQWdkR2hwY3k1d2NtOXdjeTV2YmtSdmQyNXNiMkZrWldRZ0ppWWdkR2hwY3k1d2NtOXdjeTV2YmtSdmQyNXNiMkZrWldRb0tWeHVJQ0I5TEZ4dVhHNGdJSEpsYm1SbGNqb2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQzh2SUc1bFpXUWdiMjVsSUc5eUlIUm9aU0J2ZEdobGNseHVJQ0FnSUdsbUlDZ2hkR2hwY3k1d2NtOXdjeTVuWlc1R2FXeGxJQ1ltSUNGMGFHbHpMbkJ5YjNCekxtWnBiR1ZFWVhSaEtTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z1BHVnRQa2x1ZG1Gc2FXUWdZMjl1Wm1sbmRYSmhkR2x2YmlCbWIzSWdaRzkzYm14dllXUWdZblYwZEc5dVBDOWxiVDVjYmlBZ0lDQjlYRzRnSUNBZ2RtRnlJSE4wZVd4bElEMGdkR2hwY3k1d2NtOXdjeTV6ZEhsc1pWeHVJQ0FnSUNBZ0xDQmpiSE1nUFNBblJHOTNibXh2WVdSQ2RYUjBiMjRnSnlBcklDaDBhR2x6TG5CeWIzQnpMbU5zWVhOelRtRnRaU0I4ZkNBbkp5bGNibHh1SUNBZ0lHbG1JQ2gwYUdsekxuQnliM0J6TG1acGJHVkVZWFJoSUh4OElDRjBhR2x6TG5CeWIzQnpMbUZ6ZVc1aklIeDhJSFJvYVhNdWMzUmhkR1V1Wm1sc1pVUmhkR0VwSUh0Y2JpQWdJQ0FnSUhaaGNpQjBhWFJzWlNBOUlIUm9hWE11Y0hKdmNITXVaRzkzYm14dllXUlVhWFJzWlZ4dUlDQWdJQ0FnYVdZZ0tDZG1kVzVqZEdsdmJpY2dQVDA5SUhSNWNHVnZaaUIwYVhSc1pTa2dlMXh1SUNBZ0lDQWdJQ0IwYVhSc1pTQTlJSFJwZEd4bEtIUm9hWE11Y0hKdmNITXVabWxzWlVSaGRHRWdmSHdnZEdocGN5NXpkR0YwWlM1bWFXeGxSR0YwWVNsY2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUE4WW5WMGRHOXVJSE4wZVd4bFBYdHpkSGxzWlgwZ2IyNURiR2xqYXoxN2RHaHBjeTVmYjI1RWIzZHViRzloWkgwZ1kyeGhjM05PWVcxbFBYdGpiSE45UGx4dUlDQWdJQ0FnSUNCN2RHbDBiR1Y5WEc0Z0lDQWdJQ0E4TDJKMWRIUnZiajVjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvZEdocGN5NXpkR0YwWlM1c2IyRmthVzVuS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnUEdKMWRIUnZiaUJ6ZEhsc1pUMTdjM1I1YkdWOUlHTnNZWE56VG1GdFpUMTdZMnh6SUNzZ0p5QkViM2R1Ykc5aFpFSjFkSFJ2Ymkxc2IyRmthVzVuSjMwK1hHNGdJQ0FnSUNBZ0lIdDBhR2x6TG5CeWIzQnpMbXh2WVdScGJtZFVhWFJzWlgxY2JpQWdJQ0FnSUR3dlluVjBkRzl1UGx4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQThZblYwZEc5dUlITjBlV3hsUFh0emRIbHNaWDBnYjI1RGJHbGphejE3ZEdocGN5NWZiMjVIWlc1bGNtRjBaWDBnWTJ4aGMzTk9ZVzFsUFh0amJITWdLeUFuSUVSdmQyNXNiMkZrUW5WMGRHOXVMV2RsYm1WeVlYUmxKMzArWEc0Z0lDQWdJQ0I3ZEdocGN5NXdjbTl3Y3k1blpXNWxjbUYwWlZScGRHeGxmVnh1SUNBZ0lEd3ZZblYwZEc5dVBseHVJQ0I5WEc1OUtWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRVJ2ZDI1c2IyRmtRblYwZEc5dVhHNWNiaUpkZlE9PSIsIlxubW9kdWxlLmV4cG9ydHMgPSBzYXZlQXNcblxuLy8gZnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI4Mzk1Ni9cbmZ1bmN0aW9uIHNhdmVBcyh1cmksIGZpbGVuYW1lKSB7XG4gIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBpZiAodHlwZW9mIGxpbmsuZG93bmxvYWQgPT09ICdzdHJpbmcnKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTsgLy9GaXJlZm94IHJlcXVpcmVzIHRoZSBsaW5rIHRvIGJlIGluIHRoZSBib2R5XG4gICAgbGluay5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICAgIGxpbmsuaHJlZiA9IHVyaTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTsgLy9yZW1vdmUgdGhlIGxpbmsgd2hlbiBkb25lXG4gIH0gZWxzZSB7XG4gICAgbG9jYXRpb24ucmVwbGFjZSh1cmkpO1xuICB9XG59XG5cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pZEhKaGJuTm1iM0p0WldRdWFuTWlMQ0p6YjNWeVkyVnpJanBiSWk5b2IyMWxMMnBoY21Wa0wyTnNiMjVsTDI1dEwyUnZkMjVzYjJGa1luVjBkRzl1TDNOaGRtVXRZWE11YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdRVUZEUVN4TlFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGSExFMUJRVTA3TzBGQlJYWkNMR3RFUVVGclJEdEJRVU5zUkN4VFFVRlRMRTFCUVUwc1EwRkJReXhIUVVGSExFVkJRVVVzVVVGQlVTeEZRVUZGTEVOQlFVTTdSVUZET1VJc1NVRkJTU3hKUVVGSkxFZEJRVWNzVVVGQlVTeERRVUZETEdGQlFXRXNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenRGUVVOMlF5eEpRVUZKTEU5QlFVOHNTVUZCU1N4RFFVRkRMRkZCUVZFc1MwRkJTeXhSUVVGUkxFVkJRVVU3U1VGRGNrTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEYUVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFJRVUZSTEVOQlFVTTdTVUZEZWtJc1NVRkJTU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEhRVUZITEVOQlFVTTdTVUZEYUVJc1NVRkJTU3hEUVVGRExFdEJRVXNzUlVGQlJTeERRVUZETzBsQlEySXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdSMEZEYWtNc1RVRkJUVHRKUVVOTUxGRkJRVkVzUTBGQlF5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1IwRkRka0k3UVVGRFNDeERRVUZESWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlITmhkbVZCYzF4dVhHNHZMeUJtY205dElHaDBkSEE2THk5emRHRmphMjkyWlhKbWJHOTNMbU52YlM5eGRXVnpkR2x2Ym5Ndk1qZ3pPVFUyTDF4dVpuVnVZM1JwYjI0Z2MyRjJaVUZ6S0hWeWFTd2dabWxzWlc1aGJXVXBJSHRjYmlBZ2RtRnlJR3hwYm1zZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkaEp5azdYRzRnSUdsbUlDaDBlWEJsYjJZZ2JHbHVheTVrYjNkdWJHOWhaQ0E5UFQwZ0ozTjBjbWx1WnljcElIdGNiaUFnSUNCa2IyTjFiV1Z1ZEM1aWIyUjVMbUZ3Y0dWdVpFTm9hV3hrS0d4cGJtc3BPeUF2TDBacGNtVm1iM2dnY21WeGRXbHlaWE1nZEdobElHeHBibXNnZEc4Z1ltVWdhVzRnZEdobElHSnZaSGxjYmlBZ0lDQnNhVzVyTG1SdmQyNXNiMkZrSUQwZ1ptbHNaVzVoYldVN1hHNGdJQ0FnYkdsdWF5NW9jbVZtSUQwZ2RYSnBPMXh1SUNBZ0lHeHBibXN1WTJ4cFkyc29LVHRjYmlBZ0lDQmtiMk4xYldWdWRDNWliMlI1TG5KbGJXOTJaVU5vYVd4a0tHeHBibXNwT3lBdkwzSmxiVzkyWlNCMGFHVWdiR2x1YXlCM2FHVnVJR1J2Ym1WY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc2IyTmhkR2x2Ymk1eVpYQnNZV05sS0hWeWFTazdYRzRnSUgxY2JuMWNibHh1SWwxOSJdfQ==