document.addEventListener("DOMContentLoaded", () => {
    const folderIdInput = document.getElementById("folder-id");
    const iconFileInput = document.getElementById("icon-file");
    const preview = document.getElementById("preview");
    const applyButton = document.getElementById("apply-icon");
    const folderSelect = document.getElementById("folder-select");
  
    let selectedImage = null;
  
    // ブックマークフォルダの一覧を取得して表示
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      function addFolders(nodes, depth = 0) {
        nodes.forEach(node => {
          if (node.children) {  // フォルダの場合
            const option = document.createElement('option');
            option.value = node.id;
            option.textContent = '  '.repeat(depth) + node.title;
            folderSelect.appendChild(option);
            addFolders(node.children, depth + 1);
          }
        });
      }
      addFolders(bookmarkTreeNodes);
    });
  
    // フォルダが選択されたらIDを入力欄に設定
    folderSelect.addEventListener('change', (event) => {
      folderIdInput.value = event.target.value;
    });
  
    // プレビューの表示
    iconFileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImage = e.target.result;
          preview.src = selectedImage;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // アイコン適用ボタンの処理
    applyButton.addEventListener("click", () => {
      const folderId = folderIdInput.value;
  
      if (!folderId || !selectedImage) {
        alert("Please select both folder and an image.");
        return;
      }
  
      // 保存
      chrome.storage.local.set({ [folderId]: selectedImage }, () => {
        alert("Icon applied successfully!");
      });
    });
  });
  