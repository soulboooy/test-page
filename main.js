// 移动端菜单切换
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuBtn.innerHTML = mobileMenu.classList.contains('hidden') 
    ? '<i class="fa fa-bars text-xl"></i>' 
    : '<i class="fa fa-times text-xl"></i>';
});

// 滚动时导航栏样式变化
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shadow-md');
    header.classList.remove('shadow-sm');
  } else {
    header.classList.remove('shadow-md');
    header.classList.add('shadow-sm');
  }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 文章阅读时间计算
document.addEventListener('DOMContentLoaded', () => {
  const articles = document.querySelectorAll('.article-content');
  
  articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 每分钟200词
    
    const timeElement = document.createElement('div');
    timeElement.className = 'text-sm text-gray-500 mt-2';
    timeElement.innerHTML = `<i class="fa fa-clock-o mr-1"></i> 阅读时间: ${readingTime} 分钟`;
    
    article.parentNode.insertBefore(timeElement, article.nextSibling);
  });
});

// 评论提交
document.getElementById('comment-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;
  
  if (!name || !email || !comment) {
    alert('请填写所有必填字段');
    return;
  }
  
  // 模拟提交评论
  const commentsContainer = document.getElementById('comments-container');
  const newComment = document.createElement('div');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <div class="comment-header">
      <div class="comment-author">${name}</div>
      <div class="comment-date">刚刚</div>
    </div>
    <div class="comment-content">
      ${comment}
    </div>
  `;
  
  commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
  
  // 清空表单
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('comment').value = '';
  
  // 显示成功消息
  const successMessage = document.createElement('div');
  successMessage.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
  successMessage.textContent = '评论提交成功，等待审核中...';
  
  const formContainer = document.getElementById('comment-form-container');
  formContainer.parentNode.insertBefore(successMessage, formContainer.nextSibling);
  
  // 3秒后移除成功消息
  setTimeout(() => {
    successMessage.remove();
  }, 3000);
});
  