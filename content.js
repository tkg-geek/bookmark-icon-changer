chrome.storage.local.get(null, (items) => {
    for (const [folderId, iconUrl] of Object.entries(items)) {
      const folderElement = document.querySelector(`[data-id="${folderId}"]`);
      if (folderElement) {
        folderElement.style.backgroundImage = `url('${iconUrl}')`;
        folderElement.style.backgroundSize = "cover";
      }
    }
  });
  