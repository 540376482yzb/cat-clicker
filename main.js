document.addEventListener('DOMContentLoaded',()=>{
    
	const model = {
		currentCat: null,
		cats:
            [
                {
                    name: 'Potato',
                    count: 0,
                    url:'http://www.catster.com/wp-content/uploads/2015/06/600px-cat-teeth-open-mouth.jpg'
                },
                {
                    name: 'Snow',
                    count: 0,
                    url:'http://vignette2.wikia.nocookie.net/creepypasta/images/b/b9/600px-odd-eyed-white-cat.jpg/revision/latest?cb=20141226081636'
                },
                {
                    name: 'Coffee',
                    count: 0,
                    url:'http://www.patsusmilch.com/wp-content/uploads/2014/11/600px-orange-cat.jpg'
                },
                {
                    name:'Tuxedo',
                    count: 0,
                    url:'https://i.pinimg.com/originals/e0/4b/10/e04b10dd4cc523977dcdc991e5812f30.jpg'
                },
                {
                    name:'Peanut Bro',
                    count:0,
                    url:'https://willisweaver1.files.wordpress.com/2016/01/manx-cat3-600px-maine-coon-cats.jpg?w=600&h=400'
                }
            ],
		init(){
			model.currentCat = model.cats[0]
		},

		getAllCats(){
			return this.cats
		}
	}


	const octopus = {

		incrCatCount(){
			model.currentCat.count ++
		},

		goGetCats(){
			return model.getAllCats()
        },
        
		getCurrCat(){
			return model.currentCat
        },
        
		setCurrCat(copyCat){
			model.currentCat = copyCat
        },
        
		init(){
			model.init()
			clickerView.init()
			displayView.init()
		}
	}

	const clickerView = {

		listGrp: document.querySelector("ul"),

		init(){
			octopus.goGetCats().forEach( (cat)=>{

				//Create cat button
				let newList = document.createElement('li')
				newList.classList.add("cat-button")
				newList.textContent = cat.name

				//Bind Events to cat button
				newList.addEventListener('click', ((copyCat)=>{
					return ()=>{

						//Increament cat count
						octopus.setCurrCat(copyCat)

                        displayView.render()
                        this.renderBtn()

					}
				})(cat))
				//Group lists
				this.listGrp.appendChild(newList);
				//Make first button active
				this.listGrp.querySelector("li").classList.add('active-one')
			})

			this.render()
		},

		render(){
			let clickArea = document.querySelector(".click-area")
			clickArea.appendChild(this.listGrp)
        },

        renderBtn(){
            const catLists = document.querySelectorAll(".cat-button")
            catLists.forEach( (catBtn) =>{
                if(catBtn.textContent === octopus.getCurrCat().name){
                    catBtn.classList.add('active-one')
                }else{
                    catBtn.classList.remove('active-one')
                }
            })

        }
	}

	const displayView = {

        myCat: null,
        
		init(){
			this.myCat = octopus.getCurrCat()
			document.querySelector(".cat-name").textContent = this.myCat.name
			document.querySelector(".cat-image").setAttribute("src", this.myCat.url)
			document.querySelector(".cat-count").textContent = this.myCat.count
			const catDom = document.querySelector(".cat-container")
			catDom.addEventListener('click',()=> {
				octopus.incrCatCount()
				this.render()
			})
        },
        
		render(){
			this.myCat = octopus.getCurrCat()
			document.querySelector(".cat-name").textContent = this.myCat.name
			document.querySelector(".cat-image").setAttribute("src", this.myCat.url)
			document.querySelector(".cat-count").textContent = this.myCat.count
		}
	}

	octopus.init()

})