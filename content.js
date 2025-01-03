// アイコン変更の処理
function applyCustomIcons() {
  // ブォルダアイコンを探す
  const folderIcons = document.querySelectorAll('.icon-folder-open');
  
  // 保存されているアイコンを取得して適用
  chrome.storage.local.get(null, (items) => {
    folderIcons.forEach(icon => {
      const folderItem = icon.closest('[data-id]');
      if (folderItem) {
        const folderId = folderItem.getAttribute('data-id');
        if (folderId && items[folderId]) {
          // カスタムアイコンのクラスを追加
          icon.classList.add('custom-folder-icon');
          // 背景画像を設定
          icon.style.backgroundImage = `url('${items[folderId]}')`;
        }
      }
    });
  });
}

// 初回実行
applyCustomIcons();

// DOMの変更を監視して再適用
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length > 0) {
      applyCustomIcons();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
  