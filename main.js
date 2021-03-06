
const model = {
    currentCat: null,
    prevBtn: null,
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

    add(catName,catImage){
        this.cats.push(
            {
                name: catName,
                count: 0,
                url: catImage
            }
        )
    },

    init(){
        this.currentCat = this.cats[0]
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

    addCat(catName,catImage){
        model.add(catName,catImage)
        clickerView.init()
        displayView.init()
    },

    getActiveBtn(){
        return model.prevBtn
    },
    setActiveBtn(btn){
        model.prevBtn = btn
    },
    init(){
        model.init()
        clickerView.init()
        displayView.init()
        adminView.init()
    }
}

const clickerView = {
    init(){
        this.dom = {
            clickArea: document.querySelector(".click-area"),
            listGrp: document.querySelector("ul")
        }
        this.dom.listGrp.innerHTML = ''  //clear cat button list

        octopus.goGetCats().forEach( (cat)=>{
            const catBtn = createCatBtn(cat)
            bindEventToCatBtn(catBtn,cat)
            this.dom.listGrp.appendChild(catBtn)
        })

        
        const firstBtn = document.querySelectorAll('.cat-button')[0]
        initBtnActive(firstBtn)
        this.render()
    },

    render(){
        this.dom.clickArea.appendChild(this.dom.listGrp)
    },

    updateActiveBtn(btn){
        const prevBtn = octopus.getActiveBtn()
        prevBtn.classList.remove('active-one')
        btn.classList.add('active-one')
        octopus.setActiveBtn(btn)
    }
}

const displayView = {

    myCat: null,
    
    init(){
        this.myCat = octopus.getCurrCat()
        setDisplay(this.myCat)
        const catDom = document.querySelector(".cat-container")
        catDom.addEventListener('click',()=> {
            octopus.incrCatCount()
            this.render()
        })
    },
    
    render(){
        this.myCat = octopus.getCurrCat()
        setDisplay(this.myCat)
    }
}

const adminView = {


    init(){
        const adminBtn = document.querySelector(".admin-btn")
        this.catName = document.querySelector('#cat-name')
        this.catImage = document.querySelector('#cat-image')
        this.formStyle = document.getElementsByClassName("form-container")[0].style,
        this.saveBtn = document.querySelector('#save'),
        this.cancelBtn = document.querySelector('#cancel')

        adminBtn.addEventListener('click', ()=>{
             this.render()
        })

        saveAndHide(this.catName, this.catImage)

        cancelAndHide(this.catName,this.catImage)
        
    },
    render(){
        this.formStyle.display = 'inline-flex'
    }
}
octopus.init()

//=======================================================
// Admin Helper Functions
function saveAndHide(catName,catImage){     
    adminView.saveBtn.addEventListener('click', ()=>{
        octopus.addCat(catName.value,catImage.value)
        formCleanAndHide()
    })
            
}

function cancelAndHide(catName,catImage){
   adminView.cancelBtn.addEventListener('click', ()=> {
        formCleanAndHide()
        }) 
}

function formCleanAndHide(){
    adminView.catName.value = ''
    adminView.catImage.value = ''
    adminView.formStyle.display = 'none'
}
//==========================================================


//=====================================================
//Helper Functions
//=====================================================
function createCatBtn(cat){
    const newList = document.createElement('li')
    newList.classList.add('cat-button')
    newList.textContent = cat.name
    return newList
}

function bindEventToCatBtn(newList,copyCat){
    newList.addEventListener('click', () =>{
        octopus.setCurrCat(copyCat)
        displayView.render()
        clickerView.updateActiveBtn(newList)

    })
}

function initBtnActive(btn){
    btn.classList.add('active-one')
    octopus.setActiveBtn(btn)
    
}

function setDisplay(myCat){
    document.querySelector(".cat-name").textContent = myCat.name
    document.querySelector(".cat-image").setAttribute("src", myCat.url)
    document.querySelector(".cat-count").textContent = myCat.count
}


