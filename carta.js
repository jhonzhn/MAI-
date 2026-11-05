const garden = document.querySelector('#gardenFloor');
const sceneNumber = Number(document.body.className.match(/scene-(\d+)/)?.[1] || 1);
if (sceneNumber > 1) {
  ['✿','❀','✽','❋','✿','❀','✽','✿','❋','✽','❀','✿'].forEach((mark,index)=>{
    const flower=document.createElement('span');
    flower.className='garden-flower visible';
    flower.style.left=`${4+index*8.2}%`;
    flower.innerHTML=`<span class="flower-head">${mark}</span><span class="stem-line"></span>`;
    garden.append(flower);
  });
  for(let i=0;i<17;i++){
    const grass=document.createElement('span');
    grass.className='grass'; grass.textContent=i%2?'⌁':'⌇'; grass.style.left=`${i*6.2}%`; garden.append(grass);
  }
}
for(const link of document.querySelectorAll('a.next-button[href],a.previous-link[href],a.home-button[href]')){
  link.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    document.querySelector('.page')?.classList.add('leaving');
    setTimeout(()=>{location.href=link.href;},190);
  });
}
const next=document.querySelector('.next-button[href]');
const previous=document.querySelector('.previous-link');
document.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'&&next) location.href=next.href;
  if(event.key==='ArrowLeft'&&previous) location.href=previous.href;
});
document.querySelectorAll('.flower-card').forEach(card=>card.addEventListener('click',()=>{
  const messages={
    smile:['🌻','Tu sonrisa','Tiene esa manera tan tuya de cambiar un poquito el día.'],
    being:['🌷','Tu forma de ser','Me gusta que seas tú, con tus ocurrencias y esas pequeñas cosas que te hacen especial.'],
    heart:['🌼','Tu corazón','Se nota el cariño que das. Ojalá también reserves un poquito de ternura para ti.'],
    details:['🪻','Tus detalles','A veces son las cosas pequeñas las que más se quedan. Yo sí las guardo.']
  };
  const note=messages[card.dataset.note]; if(note) openNote(...note);
}));
const starMessages={one:['Tu luz','Incluso en días nublados, sigues teniendo una luz muy tuya.'],two:['A tu ritmo','No hay apuro. Puedes ir despacio y cuidarte como necesitas.'],three:['Aquí estoy','Cuando quieras compañía, puedes contar conmigo.'],four:['Lo que eres','Tu manera de ser hace más bonito el mundo de quienes te queremos.'],five:['Un abrazo','Te mando uno de esos que no necesitan muchas palabras.'],six:['Un momento de calma','Ojalá esta noche te regale un ratito tranquilo.']};
document.querySelectorAll('[data-star]').forEach(star=>star.addEventListener('click',()=>{
  const note=starMessages[star.dataset.star]; if(note) openNote('✦',...note);
}));
function openNote(icon,title,text){
  const modal=document.querySelector('#noteModal');
  document.querySelector('#modalFlower').textContent=icon;
  document.querySelector('#modalTitle').textContent=title;
  document.querySelector('#modalText').textContent=text;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
}
function closeNote(){const modal=document.querySelector('#noteModal');if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
document.querySelector('#closeModal')?.addEventListener('click',closeNote);
document.querySelector('#modalOkay')?.addEventListener('click',closeNote);
document.querySelector('#noteModal')?.addEventListener('click',event=>{if(event.target.id==='noteModal')closeNote();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeNote();});


