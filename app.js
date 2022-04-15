const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// biến lấy ra ngoài 
const Player_Storage_Key = 'Key_Player'
const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')// lấy kích thước cd
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')
//song
const app = {
    currentIndex : 0,//vị trí hiện tại chỉ mục đầu tiên
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(Player_Storage_Key)) || {},
    songs : [
        {
        name: "Càng Níu Càng Dễ Mất",
        singer: "MR.Siro",
        path: "./asset/music/Càng Níu Giữ Càng Dễ Mất.mp3",
        image: "./asset/img/img1.jpg"
        },
        {
        name: "Chạm Đáy Nỗi Đau ",
        singer: "Erik",
        path: "./asset/music/Chạm Đáy Nỗi Đau.mp3",
        image:
                "./asset/img/img2.jpg"
        },
        {
        name: "Chỉ Anh Hiểu Em",
        singer: "Khắc Việt ",
        path:
            "./asset/music/Chỉ Anh Hiểu Em.mp3",
        image: "./asset/img/img3.jpg"
        },
        {
        name: "Chỉ Cần Em Hạnh Phúc",
        singer: "Hồ Quang Hiếu",
        path: "./asset/music/Chỉ Cần Em Hạnh Phúc.mp3",
        image:
            "./asset/img/img4.jpg"
        },
        {
        name: "Chia Tay Đừng Làm Bạn",
        singer: "Khắc Hưng",
        path: "./asset/music/Chia Tay Đừng Làm Bạn.mp3",
        image:
            "./asset/img/img5.jpg"
        },
        {
        name: "Chiếc Khăn Gió Ấm ",
        singer: "Khánh Phương",
        path:
            "./asset/music/Chiếc Khăn Gió Ấm.mp3",
        image:
            "./asset/img/img6.jpg"
        },
        {
        name: "Cho Em Một Lần Yêu",
        singer: "Đông Nhi",
        path: "./asset/music/Cho Em Một Lần Yêu.mp3",
        image:
            "./asset/img/img7.jpg"
        },
        {
            name: "Chờ Ngày Mưa Tan",
            singer: "Noo Phước Thịnh",
            path: "./asset/music/Chờ Ngày Mưa Tan.mp3",
            image:
            "./asset/img/img8.jpg"
        },
        {
            name: "Có Khi Nào Rời Xa",
            singer: "Bích Phương",
            path: "./asset/music/Có Khi Nào Rời Xa.mp3",
            image:
            "./asset/img/img9.jpg"
        },
        {
            name: "Có Lẽ Em",
            singer: "Bích Phương",
            path: "./asset/music/Có Lẽ Em.mp3",
            image:
            "./asset/img/img10.jpg"
        }
    ],
    setconnfig :function (key , value){
        this.config[key] = value;
        localStorage.setItem(Player_Storage_Key , JSON.stringify( this.config))
    },
    // show các bài hát lên màn hình
    render: function(){
            const htmls = this.songs.map((song , index ) => {
                return `                
                <div class="song ${ index === this.currentIndex ? 'active' :'' } " data-index= "${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>               
                `
                
        })
        playList.innerHTML = htmls.join('');  
        },
  
    //Định nghĩa thuộc tính tên bài hát 
    defineProperties : function(){
        Object.defineProperty (this , 'currentSong', {
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    //xử lí sự kiện trong DOM 
    handleEvent: function(){
            const cdWidth = cd.offsetWidth // lấy cd width chiều ngang hiện tại = offsetWidth chiều ngang 
            
            //xử lý cd quay 
            const cdThumbAnimate = cdThumb.animate([
                { transform : 'rotate(360deg)'  } // quay 360 độ

            ],{
                duration : 10000,//10000 giây
                iterations : Infinity // quay vô hạn
            })
            cdThumbAnimate.pause()
            //xử lý phóng to thu nhỏ cd
            document.onscroll = function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                // kéo lên kéo xuốn list và độ dài của list khi kéo lên kéo xuống
                const newcdWidth = cdWidth - scrollTop// độ dài cdWidth mới
                cd.style.width = newcdWidth> 0 ? newcdWidth + 'px' : 0
                cd.style.opacity = newcdWidth / cdWidth // mờ avt 
            }

            //xử lí nút Play
            playBtn.onclick = function(){
                if(app.isPlaying){
                    audio.pause()                              
                }
                else{
                audio.play()                         
            }
            //khi song được play 
            audio.onplay = function(){
                app.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }
            //khi song được pause
            audio.onpause = function(){
                app.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause() 
            }
            //Khi tiến đọ bài hát thay đổi
            audio.ontimeupdate= function(){
                if(audio.duration){
                    const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPersent
                }

            }
            // xử lí tua 
            progress.onchange = function(e){
                const seekTime = audio.duration / 100 *e.target.value
                audio.currentTime = seekTime
            }
            //xử lý nút next
            nextBtn.onclick = function(){
                if (app.isRandom){
                    app.PlayRandomSong()
                }else{
                        app.nextSong()
                }
                audio.play()  
                app.render()    
                app.scrollToActiveSong()                    
            }

            //xử lý nút prev
            prevBtn.onclick = function(){
                if (app.isRandom){
                    app.PlayRandomSong()
                }else{
                    app.prevSong()
                }                       
                audio.play()
                app.render()  
                app.scrollToActiveSong()
            }
            //xử lý nút Random
            randomBtn.onclick = function(e){
                app.isRandom = !app.isRandom
                app.setconnfig('isRandom ' ,app.isRandom)
                randomBtn.classList.toggle('active' , app.isRandom)                       
            }
              //xử lý lặp lại bài hát
            repeatBtn.onclick = function(e){
                app.isRepeat = !app.isRepeat
                app.setconnfig('isRepeat ' ,app.isRepeat)
                repeatBtn.classList.toggle('active' , app.isRepeat)   
            }
        
            //xử lý khi phát tới cuối audio
            audio.onended = function(){// chuyển bài tiếp theo 
                if(app.isRepeat){
                    audio.play()
                }else{
                    nextBtn.click()
                }
            }
            // lắng nghe click vào list danh sách
            playList.onclick = function (e){
                const songNode = e.target.closest('.song:not(.active)')
                // xử lí khi click vào song
                if(songNode || e.target.closest('.option')){
                    //xử lý click vào song
                    if(songNode){
                        app.currentIndex = Number(songNode.dataset.index)
                        app.loadCurrentSong()
                        app.render()
                        audio.play()
                    }
                    if(e.target.closest('.option')){

                    }
                }        
            }
        }  
    
                               
    }, 

    //lấy bài đang phát hiện lên có background màu hồng
    scrollToActiveSong : function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'nearest',
            })
        }, 300)
    },
    // load lấy ra tên bà hát avt vs audio
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name// current song đã lấy từ defineProperties
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    scrollToActiveSong : function(){
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'nearest',
            })
        }, 300)
    },
    //nextSong
    nextSong : function(){
        this.currentIndex++ 
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    loadconfig :function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

    },
    prevSong : function(){
        this.currentIndex-- 
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1 //trả về phần tử cuois mảng
        }
        this.loadCurrentSong()
    },
    PlayRandomSong : function(){
            let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)// điều kiể trùng lặp ko bằng cái cũ 
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    
                   
    start : function(){
        //gán cấu hình từ config vào ứng dụng
        this.loadconfig()
        //Định nghĩa thuộc tính cho Object
        this.defineProperties()

        //Lắng nghe Sự kiện cho DOM event
        this.handleEvent()
       
        //Tải thông tin bài hát vào giao diện(UI ) khi chạy 
        this.loadCurrentSong()
        
        //Render danh sách bài hát 
        this.render()
        //Hiển thì trạng thái random vs repeat  
        randomBtn.classList.toggle('active' , app.isRandom)   
        repeatBtn.classList.toggle('active' , app.isRepeat)   
}
}
app.start();