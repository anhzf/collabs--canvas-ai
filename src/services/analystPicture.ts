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
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private cvs: HTMLCanvasElement,
  ) {}

  public async getAnalyst(): Promise<Analysis> {
    const req = await this.buildRequest();
    const res = await fetch(AnalystPicture.apiUrl, req);
    const resData = await res.json();

    return resData;
  }

  private async buildRequest(): Promise<AnalystRequest> {
    const fd = new FormData();

    fd.append('image', await this.getImgBlob());

    return {
      method: 'POST',
      mode: 'no-cors',
      body: fd,
    };
  }

  public getImgBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      this.cvs.toBlob((imgBlob) => resolve(imgBlob ?? new Blob()));
    });
  }

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
