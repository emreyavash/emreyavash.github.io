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
        storeElement : function(element){
            let infos;
            if(localStorage.getItem('infos')===null){
                infos= [];
                infos.push(element);
            }else{
                infos=JSON.parse(localStorage.getItem('infos'));
                infos.push(element);
            }
            localStorage.setItem('infos',JSON.stringify(infos));
        }
    
    
    }
    
    })();

const submit = document.querySelector('#submit');

const InformationController = (function () {
    //private
    const Info = function (firstName, lastName, birthday, employed, address, hobbies, gender) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.employed = employed;
        this.address = address;
        this.hobbies = hobbies;
        this.gender = gender;
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

        addItems: (firstName, lastName, birthday, employed, address, hobbies, gender) => {


            const newItems = new Info(firstName, lastName, birthday, employed, address, hobbies, gender);
            data.infos.push(newItems);
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
        deleteBtn: '#deleteBtn',
        itemList: '.item-list',
        firstName: '#firstName',
        lastName: '#lastName',
        birthDay: '#birthDay',
        address: '#address',
    }




    //public
    return {

        creatElements: (tableElements) => {


            tableElements.forEach(element => {
                html +=
                    `
                <tr>

                <th>${element.firstName}</th>
                <th>${element.lastName}</th>
                <th>${element.birthDay}</th>
                <th>${element.employed}</th>
                <th>${element.address}</th>
                <th>${element.hobbies}</th>
                <th>${element.gender}</th>
                <th>
                <i class="btn btn-danger fas fa-times deleteBtn">
                Delete
                </i>
                    </th>    

                </tr>
                `
            });
            document.querySelector(Selectors.itemList).innerHTML = html;
        },
        getSelectors: () => {
            return Selectors;
        },
        getSelectedCheckboxValues: (name) => {
            const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            return values;
        },
        addElements: (elmnt) => {
            let item;
            item = `
            <tr>

                <th class="clearElement">${elmnt.firstName}</th>
                <th class="clearElement">${elmnt.lastName}</th>
                <th class="clearElement">${elmnt.birthday}</th>
                <th class="clearElement">${elmnt.employed}</th>
                <th class="clearElement">${elmnt.address}</th>
                <th class="clearElement">${elmnt.hobbies}</th>
                <th class="clearElement">${elmnt.gender}</th> 
                <th class="clearElement">               
                    
                        <i class="btn btn-danger fas fa-times deleteBtn">
                        Delete
                        </i>
                    
                </th>    
            </tr>
            `;
        
            document.querySelector(Selectors.itemList).innerHTML += item;
        },
        deleteInput: () => {
            const items=document.querySelectorAll('.clear');
            const itemsC = document.querySelectorAll('.clearC');
            items.forEach((item)=>{
                if(item.classList.contains('clear')){
                    item.value="";
                
                }                 
            });
            itemsC.forEach((item)=>{
                if(item.classList.contains('clearC')){
                    item.checked=false;
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

        // clear infos in table
       const deleteBtn=  document.querySelector(UIselecotrs.itemList).addEventListener('click', clearTable);
        

    }
    const addTable = (e) => {
        var empValue;
        var gender;
        
        const firstName = document.querySelector(UIselecotrs.firstName).value;
        const lastName = document.querySelector(UIselecotrs.lastName).value;
        const birthDay = document.querySelector(UIselecotrs.birthDay).value;
        const address = document.querySelector(UIselecotrs.address).value;
        const clearInput= document.querySelectorAll('.clear');
        

    if (document.getElementById('employee').checked) {
        empValue = document.getElementById('employee').value;
    } else {
        empValue = document.getElementById('unEmployed').value;
    }

    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else {
        gender = document.getElementById('female').value;
    }
        const selected = UICtrl.getSelectedCheckboxValues('checkbox2');


        
        if (firstName != '' && lastName != '') {
            UICtrl.deleteInput();
            
            // Add Product
            const newTable = InfoCtrl.addItems(firstName, lastName, birthDay, empValue, address, selected, gender);

            console.log(newTable);
            // Add items to list

            UICtrl.addElements(newTable);
            
            //add LS
            StorageCtrl.storeElement(newTable);
        }
        

        e.preventDefault();
    }

    clearTable=(e)=>{
        if(e.target.classList.contains('deleteBtn')){
           const firstName= e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

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


