import { ProjectState } from "../../../Redux/Templates/ProjectInitialState";

/** Image resizer */
export const resizeImage = (file: File) => {
  return new Promise<File>((resolve) => {
    const MAX_SIZE = 300;
    const img = document.createElement('img');
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      if (ctx) { // Add null check
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) { // Add null check
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }
        }, file.type);
      }
    };

    const reader = new FileReader();
    reader.onloadend = () => {
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
};

/**Extract products categories */
export const extractCategories = (project: ProjectState) => {
  const categoriesArray: string[] = [];
  project.products.map(product => {
    if (product.category !== '' && !categoriesArray.includes(product.category)){
      categoriesArray.push(product.category);
    }
  });
  return categoriesArray;
}

/**Style customizers */
export const applyTemplateCustomizations = (project: ProjectState) => {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', project.template.primaryColor);
  root.style.setProperty('--secondary-color', project.template.secondaryColor);
  root.style.setProperty('--body-font-color', project.template.bodyFontColor);
  root.style.setProperty('--name-font', project.template.nameFontFamily);
  root.style.setProperty('--body-font', project.template.bodyFontFamily );
  root.style.setProperty('--project-name', project.name);
  root.style.setProperty('--project-description', project.description);
  root.style.setProperty('--project-banner', project.bannerUrl);
  root.style.setProperty('--name-font-size', project.template.nameFontSize);
  root.style.setProperty('--body-font-size', project.template.bodyFontSize);
  root.style.setProperty('--other-font-size', project.template.otherFontSize);
};

  