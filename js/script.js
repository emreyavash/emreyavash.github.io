const burgerSlide = () => {
    const burger = document.querySelector('.burger');
    const list = document.querySelector('.list');
    const listItems = document.querySelectorAll('.listItems');

    burger.addEventListener('click', () => {

        list.classList.toggle('list-active');
        listItems.forEach((link, index) => {

            if (link.style.animation) {
                link.style.animation = '';
            }
            else {
                link.style.animation = `burgerList 0.5s ease forwards ${index / 7 + 1}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

}

burgerSlide();

/* ******************🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥****************** */


 

    const divSlider = document.querySelector('.sliderDiv');
    const slider=document.querySelectorAll('.sliderDiv img');
    // Buttons
    const next=document.querySelector('#nextBtn');
    const prev=document.querySelector('#prevBtn');
   
    // Counters
    let counter=1;
    const size =slider[0].clientWidth;

  
    divSlider.style.transform='translateX('+(-size * counter)+'px)';
   
    
    //Button Listeners
    next.addEventListener('click',()=>{
       if(counter>=slider.length-1) return ;
       divSlider.style.transition='transform 0.4s ease-in-out'; 
       counter++;
       divSlider.style.transform='translateX('+(-size*counter)+'px)';
    });

    prev.addEventListener('click',()=>{
        if(counter<=0) return;
       divSlider.style.transition='transform 0.4s ease-in-out'; 
       counter--;
       divSlider.style.transform='translateX('+(-size*counter)+'px)';
       
        
        
    });

    divSlider.addEventListener('transitionend',()=>{
        if(slider[counter].id==='lastClone'){
       divSlider.style.transition='none';
       counter=slider.length - 2;
       divSlider.style.transform='translateX('+(-size*counter)+'px)';

        }
       if(slider[counter].id==='firstClone'){
            divSlider.style.transition='none';
            counter=slider.length - counter ;
            divSlider.style.transform='translateX('+(-size*counter)+'px)';
     
     }
    });
    





/* ******************🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥****************** */
const StorageController = (function () {



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
        infos: [

        ],

    }
    // public
    return {
        getinfos: () => {
            return data.infos;
        },


        addItems: (firstName, lastName, birthday, employed, address, hobbies, gender) => {


            const newItems = new Info(firstName, lastName, birthday, employed, address, hobbies, gender);
            data.infos.push(newItems);
            return newItems;
        },
        // deleteItems:(firstName)=>{
        //     data.infos.forEach((fN,index)=>{
        //         if(fN.firstName==firstName.firstName){
        //             data.infos.splice(index,1);
        //         }
        //     });
        // }
    }
})();

const UIController = (function () {
    //private
    const Selectors = {
        submitBtn: '#submit',
        deleteBtn: '.deleteBtn',
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
               <button type="submit" class="btn btn-danger btn-sm deleteBtn">
                        <i class="fas fa-times"></i>
                        Delete
                    </button>   
                    </td>    

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

                <th>${elmnt.firstName}</th>
                <th>${elmnt.lastName}</th>
                <th>${elmnt.birthday}</th>
                <th>${elmnt.employed}</th>
                <th>${elmnt.address}</th>
                <th>${elmnt.hobbies}</th>
                <th>${elmnt.gender}</th> 
                <td>               
                <button type="submit" class="btn btn-danger btn-sm deleteBtn">
                        <i class="fas fa-times"></i>
                        Delete
                    </button>   
                    </td>    
            </tr>
            `;
            document.querySelector(Selectors.itemList).innerHTML += item;
        },
        clearTable: () => {
            // document.querySelector(Selectors.firstName).value = '';
            // document.querySelector(Selectors.lastName).value = '';
            // document.querySelector(Selectors.birthDay).value = '';
            // document.querySelector(Selectors.address).value = '';


        }
    }
})();

const App = (function (UICtrl, InfoCtrl) {


    const UIselecotrs = UICtrl.getSelectors();


    const loadEventListener = (e) => {

        const submitBtn = document.querySelector(UIselecotrs.submitBtn).addEventListener('click', addTable);



    }
    const addTable = (e) => {
        var empValue;
        var gender;

        const firstName = document.querySelector(UIselecotrs.firstName).value;
        const lastName = document.querySelector(UIselecotrs.lastName).value;
        const birthDay = document.querySelector(UIselecotrs.birthDay).value;
        const address = document.querySelector(UIselecotrs.address).value;

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

            // Add Product
            const newTable = InfoCtrl.addItems(firstName, lastName, birthDay, empValue, address, selected, gender);

            console.log(newTable);
            // Add items to list

            UIController.addElements(newTable);

            //UIController.clearTable();
        }


        e.preventDefault();
    }

    return {
        init: function () {

            loadEventListener();
        }

    }
})(UIController, InformationController);

App.init();

