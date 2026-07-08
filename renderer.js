    $(function() {
        $('#load_button').click(function() {
            const url = $('#url').val()
            let id = null

            // 입력된 값에서 ID 추출 (기존 open?id=... 링크와 현재 file/d/ID/view 링크 모두 지원)
            try {
                const parsed = new URL(url)
                const fileMatch = parsed.pathname.match(/^\/file\/d\/([^/]+)/)
                if (fileMatch) {
                    id = fileMatch[1]
                } else if (parsed.pathname === '/open' && parsed.searchParams.has('id')) {
                    id = parsed.searchParams.get('id')
                }
            } catch (e) {
                id = null
            }

            // ID를 찾으면 작업 처리
            if (id) {
                // 플레이어 삽입 스크립트
                const player = '<iframe id="player_iframe" src="https://drive.google.com/file/d/' + id + '/preview" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

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
            if (size == 'w_small') {
                window.gdPlayer.resizeWindow('small')
            } else if (size == 'w_medium') {
                window.gdPlayer.resizeWindow('medium')
            } else if (size == 'w_large') {
                window.gdPlayer.resizeWindow('large')
            }
            if (typeof(size_list[size]) != 'undefined') {
                width = size_list[size]
                height = Math.round(width * 0.5625)
                $('#player').css('width', width)
                $('#player').css('height', height)
            }
        })

        $('#always_on_top').click(function() {
            window.gdPlayer.toggleAlwaysOnTop()
        })

        $('#maximize').click(function() {
            window.gdPlayer.maximize()

            $('#player').css('width', "95%")
            $('#player').css('height', "90%")

            $('#maximize').css('display', 'none')
            $('#unmaximize').css('display', 'inline')
        })

        $('#unmaximize').click(function() {
            window.gdPlayer.resizeWindow('small')
            width = 700
            height = Math.round(width * 0.5625)
            $('#player').css('width', width)
            $('#player').css('height', height)

            $('#maximize').css('display', 'inline')
            $('#unmaximize').css('display', 'none')
        })
    })