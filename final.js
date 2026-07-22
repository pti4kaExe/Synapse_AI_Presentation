const appScreens={
  health:{images:[['assets/screens/home.jpg','Главный экран Synapse AI'],['assets/screens/health-details.jpg','Показатели здоровья Synapse AI']],index:'01 / 05',title:'Здоровье в одном экране',text:'Шаги, расход энергии и Health Score помогают быстро понять текущее состояние.',list:['Общая картина дня','Результат последнего анализа','Ключевые показатели здоровья'],badge:'Health Score: 70/100'},
  training:{images:[['assets/screens/training.jpg','План тренировок Synapse AI']],index:'02 / 05',title:'Тренировки под личную цель',text:'Готовый план на сегодня, сложность, расход калорий и возможность создать свою тренировку.',list:['AI-план с упражнениями','Свои тренировки','Прогресс выполнения'],badge:'План: базовая силовая'},
  ai:{images:[['assets/screens/analysis.jpg','AI-анализ Synapse'],['assets/screens/ai-plan.jpg','Персональный AI-план'],['assets/screens/chat.jpg','Свободный диалог с Synapse AI']],index:'03 / 05',title:'AI объясняет ваши данные',text:'Ассистент рассчитывает Health Score, показывает полноту данных и отвечает на любые вопросы.',list:['Персональный анализ','План под выбранную цель','Свободный AI-чат'],badge:'Анализ готов: 70/100'},
  nutrition:{images:[['assets/screens/nutrition.jpg','AI-рацион Synapse'],['assets/screens/nutrition-diary.jpg','Дневник питания Synapse'],['assets/screens/nutrition-meals.jpg','Меню на оставшийся день']],index:'04 / 05',title:'Питание без сложных расчетов',text:'Synapse рассчитывает калории, БЖУ и воду, а пользователь может вести собственный дневник.',list:['Персональная цель КБЖУ','AI-рацион на день','Свои приемы пищи'],badge:'Цель: 2 956 ккал'},
  profile:{images:[['assets/screens/profile.jpg','Профиль пользователя Synapse'],['assets/screens/profile-settings.jpg','Настройки профиля Synapse']],index:'05 / 05',title:'Профиль под ваши цели',text:'Личные параметры, цель и настройки собраны в одном месте и используются для персонализации рекомендаций.',list:['Антропометрия и личная цель','Редактирование профиля','Настройки и конфиденциальность'],badge:'Цель: набор мышечной массы'}
};

const aiViews={
  analysis:{image:'assets/screens/analysis.jpg',title:'AI объясняет результат',copy:'Пользователь получает Health Score, период анализа, BMI и информацию о полноте данных.'},
  plan:{image:'assets/screens/ai-plan.jpg',title:'AI формирует персональный план',copy:'Рекомендации меняются под цель: снижение веса, набор массы или поддержание формы.'},
  chat:{image:'assets/screens/chat.jpg',title:'AI отвечает на свободные вопросы',copy:'Можно выбрать цель или задать свой вопрос о тренировках, питании и результатах анализа.'}
};

function switchAppScreen(key){
  const data=appScreens[key];
  const screen=document.querySelector('#demo-screen');
  const track=document.querySelector('#demo-track');
  screen.classList.add('switching');
  setTimeout(()=>{
    track.innerHTML=data.images.map(([src,alt])=>`<img src="${src}" alt="${alt}">`).join('');
    screen.scrollTop=0;
    screen.classList.remove('switching');
    screen.classList.toggle('single-screen',data.images.length===1);
  },170);
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

const interactiveCards=document.querySelectorAll('.metric-card,.persona,.solution-step,.architecture-flow article,.stack-grid article,.price-card,.feedback-card,.fix-list article,.road-item,.problem-result,.click-hint,.safety-note');
interactiveCards.forEach(card=>{
  card.classList.add('interactive-card');
  card.addEventListener('pointermove',event=>{
    const rect=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${event.clientX-rect.left}px`);
    card.style.setProperty('--my',`${event.clientY-rect.top}px`);
  });
});

const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#main-nav');
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));
