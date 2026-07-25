const Add=document.getElementById("Add"),Box=document.getElementById("mdiv"),AddTask=document.getElementById("AddTask"),Tasks=document.getElementById("Tasks");
let editTask=null;
load();

Add.onclick=()=>{Box.style.display="flex";Add.style.display="none";}

AddTask.onclick=()=>{
 const d=[inp_1.value.trim(),inp_2.value.trim(),inp_3.value.trim(),inp_4.value.trim()];
 if(editTask){update(editTask,d);}
 else create(d);
 clearForm();
 save();
 popup();
}

function create(v){
 const t=document.createElement("div");
 t.className="task glass";
 render(t,v);
 Tasks.prepend(t);
}
function render(t,v){
 t.dataset.v=JSON.stringify(v);
 t.innerHTML=`<h4>${new Date().toDateString()}</h4>
 ${v[0]?`<h3>Serial : ${v[0]}</h3>`:""}
 ${v[1]?`<p><b>Employee:</b> ${v[1]}</p>`:""}
 ${v[2]?`<p><b>Task 1:</b> ${v[2]}</p>`:""}
 ${v[3]?`<p><b>Task 2:</b> ${v[3]}</p>`:""}
 <div class="btnBox">
 <button class="editBtn">✏ Edit</button>
 <button class="deleteBtn">🗑 Delete</button>
 </div>`;
 t.querySelector(".editBtn").onclick=()=>{
  const a=JSON.parse(t.dataset.v);
  [inp_1.value,inp_2.value,inp_3.value,inp_4.value]=a;
  editTask=t;
  Box.style.display="flex";Add.style.display="none";
 };
 t.querySelector(".deleteBtn").onclick=()=>{
   if(confirm("Delete task?")){t.remove();save();}
 };
}
function update(t,v){render(t,v);editTask=null;}
function clearForm(){inp_1.value=inp_2.value=inp_3.value=inp_4.value="";Box.style.display="none";Add.style.display="block";}
function popup(){successPopup.classList.add("show");setTimeout(()=>successPopup.classList.remove("show"),1800);}
function save(){
 const arr=[...Tasks.children].map(x=>JSON.parse(x.dataset.v));
 localStorage.setItem("glassTasks",JSON.stringify(arr));
}
function load(){
 const arr=JSON.parse(localStorage.getItem("glassTasks")||"[]");
 arr.reverse().forEach(create);
}
