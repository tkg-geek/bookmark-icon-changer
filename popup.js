document.addEventListener("DOMContentLoaded", () => {
    const folderIdInput = document.getElementById("folder-id");
    const iconFileInput = document.getElementById("icon-file");
    const preview = document.getElementById("preview");
    const applyButton = document.getElementById("apply-icon");
  
    let selectedImage = null;
  
    // プレビューの表示
    iconFileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selectedImage = e.target.result; // Base64データ
          preview.src = selectedImage;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // アイコン適用ボタンの処理
    applyButton.addEventListener("click", () => {
      const folderId = folderIdInput.value;
  
      if (!folderId || !selectedImage) {
        alert("Please provide both folder ID and an image.");
        return;
      }
  
      // 保存
      chrome.storage.local.set({ [folderId]: selectedImage }, () => {
        alert("Icon applied successfully!");
      });
    });
  });
  