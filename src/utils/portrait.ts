const STORAGE_KEY = "ahmed-albashbish-portrait-v1";
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function getSavedPortrait(): string | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved?.startsWith("data:image/jpeg;base64,") ? saved : null;
  } catch {
    return null;
  }
}

export function savePortrait(portrait: string): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, portrait);
    return true;
  } catch {
    return false;
  }
}

export async function preparePortrait(file: File): Promise<string> {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error("Please choose a JPG, PNG, or WebP photo.");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Please choose a photo smaller than 12 MB.");
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("This photo could not be opened. Please try another file."));
      image.src = objectUrl;
    });

    // Resize before storage so a phone photo does not exceed the browser quota.
    const ratio = Math.min(1, 1400 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare the photo.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.86);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}