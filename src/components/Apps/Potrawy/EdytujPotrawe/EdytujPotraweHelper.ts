import IPotrawa from "../../../../interfaces/apps/potrawy/IPotrawa";
import ITag from "../../../../interfaces/apps/potrawy/ITag";

export default class EdytujPotraweHelper {
  static isImageExists = (image_url: string) => {
    return new Promise((resolve) => {
      if (image_url) {
        const img = new Image();
        img.src = image_url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      } else {
        resolve(false);
      }
    });
  };

  static dodajNowyTag = async (tagNazwa: string): Promise<ITag> => {
    const response = await fetch("/apps/posilki/tagi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nazwa: tagNazwa }),
    });
    return await response.json();
  };

  static dodajPotrawe = async (dodawanaPotrawa: IPotrawa): Promise<IPotrawa> => {
    const response = await fetch("/apps/posilki/potrawy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dodawanaPotrawa),
    });
    return await response.json();
  };

  static edytujPotrawe = async (edytowanaPotrawa: IPotrawa): Promise<IPotrawa> => {
    const response = await fetch(`/apps/posilki/potrawy/${edytowanaPotrawa._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edytowanaPotrawa),
    });
    return await response.json();
  };

  static dajNieWybraneTagi = (tagi: ITag[], wybraneTagi: ITag[]) => [
    ...tagi.filter((tag) => !wybraneTagi.find((wybranyTag) => tag._id === wybranyTag._id)),
  ];
}
