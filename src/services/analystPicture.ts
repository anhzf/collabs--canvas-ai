interface AnalystRequest {
  method: 'POST';
  mode: 'no-cors';
  body: FormData;
}

interface Analysis {
  response: number;
  status: number;
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
    const img = await this.getImgBlob();

    fd.append('file', img);

    return {
      method: 'POST',
      mode: 'no-cors',
      body: fd,
    };
  }

  public getImgBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      this.resizeCanvas(28, 28).toBlob((imgBlob) => resolve(imgBlob ?? new Blob()));
    });
  }

  public resizeCanvas(width: number, height: number): HTMLCanvasElement {
    const virtualCanvas = document.createElement('canvas');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const virtualCanvasContext = virtualCanvas.getContext('2d')!;

    virtualCanvasContext.drawImage(this.cvs, 0, 0, width, height);

    return virtualCanvas;
  }

  public static set apiUrl(v: string) {
    sessionStorage.setItem('apiUrl', v);
  }

  public static get apiUrl(): string {
    const fromsessionStorage = sessionStorage.getItem('apiUrl');

    if (!fromsessionStorage && fromsessionStorage !== '') {
      throw new Error('Please input your API URL first!');
    }
    return fromsessionStorage;
  }
}
