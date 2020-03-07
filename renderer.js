    $(function() {
        $('#load_button').click(function() {
            url = $('#url').val()
            id = null

            // 입력된 값에서 ID 추출
            if (url.match(/^https:\/\/drive\.google\.com\/open\?id\=(.*)/g)) {
                id = url.split('=')[1]
            }

            // ID를 찾으면 작업 처리
            if (id) {
                // 플레이어 삽입 스크립트
                player = '<iframe id="player_iframe" src="https://drive.google.com/file/d/' + id + '/preview" webkitallowfullscreen mozallowfullscreen allowfullscreen></webview>'

                $('#player').html(player)
                $('#window_size').css('display', 'inline')
            } else {
                $('#player').text('URL 입력이 잘못되었습니다.')
                $('#window_size').css('display', 'none')
            }
        })

        // 영상 사이즈 변경
        size_list = {
            'w_small': 700,
            'w_medium': 1000,
            'w_large': 1300
        }
        $('#window_size span').click(function() {
            size = $(this).attr('id')
            const { ipcRenderer } = require('electron')
            if (size == 'w_small') {
                ipcRenderer.send('resize-window-small')
            } else if (size == 'w_medium') {
                ipcRenderer.send('resize-window-medium')
            } else if (size == 'w_large') {
                ipcRenderer.send('resize-window-large')
            }
            if (typeof(size_list[size]) != 'undefined') {
                width = size_list[size]
                height = Math.round(width * 0.5625)
                $('#player').css('width', width)
                $('#player').css('height', height)
            }
        })

        $('#always_on_top').click(function() {
            const { ipcRenderer } = require('electron')
            ipcRenderer.send('always-on-top')
        })

        $('#maximize').click(function() {
            const { ipcRenderer } = require('electron')
            ipcRenderer.send('maximize')

            $('#player').css('width', "95%")
            $('#player').css('height', "90%")

            $('#maximize').css('display', 'none')
            $('#unmaximize').css('display', 'inline')
        })

        $('#unmaximize').click(function() {
            const { ipcRenderer } = require('electron')
            ipcRenderer.send('resize-window-small')
            width = 700
            height = Math.round(width * 0.5625)
            $('#player').css('width', width)
            $('#player').css('height', height)

            $('#maximize').css('display', 'inline')
            $('#unmaximize').css('display', 'none')
        })
    })