const StorageController = (function () {

return{

   
    getElements:()=>{
        let infos;
        if(localStorage.getItem('infos')===null){
            infos=[];
        }else{
            infos=JSON.parse(localStorage.getItem('infos'));
        }
        return infos;
    },
    storeElement : (element)=>{
        let infos;
        if(localStorage.getItem('infos')===null){
            infos= [];
            infos.push(element);
        }else{
            infos=JSON.parse(localStorage.getItem('infos'));
            infos.push(element);
        }
        localStorage.setItem('infos',JSON.stringify(infos));
    },
    deleteElements:(firstName)=>{
        let elements=JSON.parse(localStorage.getItem('infos'));
      
        elements.forEach((elmnt,index)=>{
             if(firstName==elmnt.firstName){
                 elements.splice(index,1);
             }
        });
        localStorage.setItem('infos',JSON.stringify(elements));
    }


}

})();

const submit = document.querySelector('#submit');

const InformationController = (function () {
    //private
    const Info = function (firstName, lastName, phone, email,text) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.text = text;
       
    }

    const data = {
        infos: StorageController.getElements(),
        selectedElement:null,

    }
    // public
    return {
        getinfos: () => {
            return data.infos;
        },
        getElementFn:(Fn)=>{
            let element = null;
            data.infos.forEach((elmnt)=>{
                if(elmnt.firstName==Fn){
                    element=elmnt;
                }
            });
            return element;
        },
        setCurrentElement:(element)=>{
            data.selectedElement=element;
        },
        getCurrentElement:()=>{
            return data.selectedElement;
        },

        addItems: (firstName, lastName, phone, email, text) => {


            const newItems = new Info(firstName, lastName, phone, email, text);
            return newItems;
        },
        deleteItems:(firstName)=>{
            data.infos.forEach((fN,index)=>{
                if(fN.firstName==firstName.firstName){
                    data.infos.splice(index,1);
                }
            });
        }
    }
})();

const UIController = (function () {
    //private
    const Selectors = {
        submitBtn: '#submit',
        itemList: '.item-list',
        firstName: '#firstName',
        lastName: '#lastName',
        phone: '#phone',
        email: '#email',
        text: '#contactText',

    }




    //public
    return {

        creatElements: (tableElements) => {


            tableElements.forEach(element => {
                html +=
                    `
                <tr>

                <td class="clearElement">${elmnt.firstName}</td>
            <td class="clearElement">${elmnt.lastName}</td>
            <td class="clearElement">${elmnt.phone}</td>
            <td class="clearElement">${elmnt.email}</td>
            <td class="clearElement">${elmnt.text}</td>
            
                <td class="clearElement">               
                    
                        <i class="btn btn-danger fas fa-times deleteBtn">
                        Delete
                        </i>
                    
                </td>    

                </tr>
                `
            });
            document.querySelector(Selectors.itemList).innerHTML = html;
        },
        getSelectors: () => {
            return Selectors;
        },
       
        addElements: (elmnt) => {
            document.querySelector('#table').style.display='block';
            let item;
            item = `
            <tr>

               
            <td class="clearElement">${elmnt.firstName}</td>
            <td class="clearElement">${elmnt.lastName}</td>
            <td class="clearElement">${elmnt.phone}</td>
            <td class="clearElement">${elmnt.email}</td>
            <td class="clearElement">${elmnt.text}</td>
            
                <td class="clearElement">               
                    
                        <i class="btn btn-danger fas fa-times deleteBtn">
                        Delete
                        </i>
                    
                </td>    
            </tr>
            `;
        
            document.querySelector(Selectors.itemList).innerHTML += item;
        },
        deleteInput: () => {
            const items=document.querySelectorAll('.clear');
            items.forEach((item)=>{
                if(item.classList.contains('clear')){
                    item.value="";
                
                }                 
            });
            
        },
        clearTable:()=>{
            const items=document.querySelectorAll('.clearElement');
            
            items.forEach((item)=>{
                if(item.classList.contains('clearElement')){
                    item.remove();
                }
            });
        }
    }
})();

const App = (function (UICtrl, InfoCtrl,StorageCtrl) {


    const UIselecotrs = UICtrl.getSelectors();


    const loadEventListener = () => {

        // add table
        const submitBtn = document.querySelector(UIselecotrs.submitBtn).addEventListener('click', addTable);

        //clear infos in table
      const deleteBtn=  document.querySelector(UIselecotrs.itemList).addEventListener('click', clearTable);
        

    }
    const addTable = (e) => {
        
        const firstName = document.querySelector(UIselecotrs.firstName).value;
        const lastName = document.querySelector(UIselecotrs.lastName).value;
        const phone = document.querySelector(UIselecotrs.phone).value;
        const email = document.querySelector(UIselecotrs.email).value;
        const text = document.querySelector(UIselecotrs.text).value;

       
        
        if (firstName != '' && lastName != '') {
            UICtrl.deleteInput();
            
            // Add Product
            const newTable = InfoCtrl.addItems(firstName, lastName, phone, email, text);

            
            // Add items to list

            UICtrl.addElements(newTable);

            // add LS 
            StorageCtrl.storeElement(newTable);
        }
        

        e.preventDefault();
    }

    clearTable=(e)=>{
        if(e.target.classList.contains('deleteBtn')){
           const firstName= e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

           // get selected element
           const element=InfoCtrl.getElementFn(firstName);
           const setElement = InfoCtrl.setCurrentElement(element);
           const getElement=InfoCtrl.getCurrentElement();

           //delete element
           InfoCtrl.deleteItems(getElement);
           UICtrl.clearTable();

           StorageCtrl.deleteElements(firstName);
           
        }
        
        e.preventDefault();
    }
   

    return {
        init: function () {

            loadEventListener();
        }

    }
})(UIController, InformationController,StorageController);

App.init();


