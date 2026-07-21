const appScreens={
  health:{image:'assets/screens/home.jpg',index:'01 / 04',title:'Здоровье в одном экране',text:'Шаги, расход энергии и Health Score помогают быстро понять текущее состояние.',list:['Общая картина дня','Результат последнего анализа','Ключевые показатели здоровья'],badge:'Health Score: 70/100'},
  training:{image:'assets/screens/training.jpg',index:'02 / 04',title:'Тренировки под личную цель',text:'Готовый план на сегодня, сложность, расход калорий и возможность создать свою тренировку.',list:['AI-план с упражнениями','Свои тренировки','Прогресс выполнения'],badge:'План: базовая силовая'},
  ai:{image:'assets/screens/analysis.jpg',index:'03 / 04',title:'AI объясняет ваши данные',text:'Ассистент рассчитывает Health Score, показывает полноту данных и отвечает на любые вопросы.',list:['Персональный анализ','План под выбранную цель','Свободный AI-чат'],badge:'Анализ готов: 70/100'},
  nutrition:{image:'assets/screens/nutrition.jpg',index:'04 / 04',title:'Питание без сложных расчетов',text:'Synapse рассчитывает калории, БЖУ и воду, а пользователь может вести собственный дневник.',list:['Персональная цель КБЖУ','AI-рацион на день','Свои приемы пищи'],badge:'Цель: 2 956 ккал'}
};

const aiViews={
  analysis:{image:'assets/screens/analysis.jpg',title:'AI объясняет результат',copy:'Пользователь получает Health Score, период анализа, BMI и информацию о полноте данных.'},
  plan:{image:'assets/screens/ai-plan.jpg',title:'AI формирует персональный план',copy:'Рекомендации меняются под цель: снижение веса, набор массы или поддержание формы.'},
  chat:{image:'assets/screens/chat.jpg',title:'AI отвечает на свободные вопросы',copy:'Можно выбрать цель или задать свой вопрос о тренировках, питании и результатах анализа.'}
};

function switchAppScreen(key){
  const data=appScreens[key];
  const image=document.querySelector('#demo-image');
  image.classList.add('switching');
  setTimeout(()=>{image.src=data.image;image.alt=data.title;image.classList.remove('switching')},170);
  document.querySelector('#demo-index').textContent=data.index;
  document.querySelector('#demo-title').textContent=data.title;
  document.querySelector('#demo-text').textContent=data.text;
  document.querySelector('#demo-list').innerHTML=data.list.map(item=>`<li>${item}</li>`).join('');
  document.querySelector('#demo-badge').textContent=data.badge;
}

document.querySelectorAll('[data-app-screen]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-app-screen]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  switchAppScreen(button.dataset.appScreen);
}));

document.querySelectorAll('[data-ai-view]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-ai-view]').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const data=aiViews[button.dataset.aiView];
  const image=document.querySelector('#secondary-image');
  image.style.opacity='.25';
  setTimeout(()=>{image.src=data.image;image.alt=data.title;image.style.opacity='1'},150);
  document.querySelector('#secondary-title').textContent=data.title;
  document.querySelector('#secondary-copy').textContent=data.copy;
}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting) entry.target.classList.add('visible');
}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));

const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#main-nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
