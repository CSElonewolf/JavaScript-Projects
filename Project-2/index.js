let text;
let div = document.createElement('div');
 if(localStorage.getItem('text') != null)
 {
    text = document.createTextNode(localStorage.getItem('text'));
 }
 else
 {
    text = document.createTextNode('Click me to edit');
 }
    let heading = document.querySelector('#head')
   
    div.setAttribute('id','editid')
    div.setAttribute('class','editclass')
    
    div.appendChild(text);
    heading.appendChild(div);
   //  console.log(div)
   let outercount = 0;
   div.addEventListener('click',function(){
       let count = document.getElementsByClassName('textarea').length;
       outercount++;
       if( count == 0){
           let html = editid.innerText;
       div.innerHTML = `<textarea class="textarea" id ='textarea' cols="30" rows="10">${html}</textarea>`;
       }
       let textarea = document.getElementById('textarea');
       textarea.addEventListener('blur',function(){
           editid.innerText = textarea.value;
           localStorage.setItem('text',textarea.value);
         location.href = `http://wa.me/917908334807?text=${textarea.value}`;
            document.getElementById('paragraph').innerText = "Click again if you wish to edit it."
       })  
   })
