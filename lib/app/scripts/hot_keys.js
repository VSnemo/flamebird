/* global $, taskList,  _  */

window.HotKeys = (function() { //eslint-disable-line
  var global = window.global
  var isEnabled = false
  var taskCharCodes = [
    81,
    87,
    69,
    82,
    84,
    89,
    85,
    73,
    79,
    80,
    219,
    221,
    65,
    83,
    68,
    70,
    71,
    72,
    74,
    75,
    76,
    186,
    222,
    90,
    88,
    67,
    86,
    66,
    78,
    77,
    188,
    190,
    191,
  ]

  function onKeydown(event) {
    var tag = event.target.tagName
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      if (event.shiftKey) {
        if (event.keyCode === 82) {
          event.preventDefault()
          event.stopPropagation()
          var task = taskList.getActive()
          if (!task.isStartRunning) {
            if (task.isRun) {
              global.stopTask(task.name)
            } else {
              global.runTask(task.name)
            }
          }
          event.keyCode = 0
          event.ctrlKey = false
          event.cancelBubble = true
          event.preventDefault()
          event.stopPropagation()
          return false
        }
      } else {
        if (event.keyCode === 9) {
          global.handleClickTab(
            taskList.getActiveTab() === 'npm' ? 'procfile' : 'npm'
          )
        } else {
          $('.task[char-code="' + event.keyCode + '"]').trigger('click')
        }
      }
    }
  }

  function setEnabled(enabled) {
    isEnabled = enabled
    if (isEnabled) {
      window.addEventListener('keydown', onKeydown, false)
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  }

  function connect(element, indexKeycode) {
    element.setAttribute('char-code', taskCharCodes[indexKeycode])
  }

  var currentTasks = document.querySelectorAll('#tasks .task')
  _.forEach(currentTasks, function(task, index) {
    connect(task, index)
  })

  setEnabled(true)

  return {
    setEnabled: setEnabled,
    isEnabled: function() {
      return isEnabled
    },
    connect: connect,
  }
})()