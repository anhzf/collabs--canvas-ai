interface AnalystRequest {
  method: 'POST';
  mode: 'no-cors';
  body: FormData;
}

interface Analysis {
  prediction: number;
}

// interface analystPictureOptions {
//   apiUrl: string;
// }

export default class AnalystPicture {
  private static cvs: HTMLCanvasElement;

  public static lastPicSent: string;

  public static getAnalyst(cvs: HTMLCanvasElement): Promise<Analysis> {
    this.cvs = cvs;
    const req = this.buildRequest();

    return fetch(this.apiUrl, req)
      .then((res: Response) => res.json())
      .then((res: Analysis) => res);
  }

  private static buildRequest(): AnalystRequest {
    const fd = new FormData();
    const base64Pic = this.cvs.toDataURL();
    // fd.append('image', this.canvasToBlob());
    fd.append('image', base64Pic);

    this.lastPicSent = base64Pic;
    return {
      method: 'POST',
      mode: 'no-cors',
      body: fd,
    };
  }

  // private static canvasToBlob(): Blob {
  //   return this.cvs.toBlob((blob: Blob) => blob);
  // }

  public static set apiUrl(v: string) {
    sessionStorage.setItem('apiUrl', v);
  }

  public static get apiUrl(): string {
    const fromsessionStorage = sessionStorage.getItem('apiUrl');

    if (!fromsessionStorage) {
      this.apiUrl = window.prompt('Please specify the API URL to send') ?? '';
      return this.apiUrl;
    }
    return fromsessionStorage;
  }
}
