export interface SlugValue {
  slug: string;
  title: string;
}

export interface ImageData {
  id: string;
  title?: string;
  src: string;
  captured: number;
  width: number;
  height: number;
  exposure: string;
  aperture: string;
  iso: string;
  focal: string;
  camera: SlugValue;
  lens: SlugValue;
  keywords: SlugValue[];
}

export const images: ImageData[] = [{"id":"5","title":"Untitled","src":"/post-images/5.jpg","captured":1669555208000,"width":2800,"height":2240,"exposure":"1/450s","aperture":"ƒ/8","iso":"400","focal":"64mm","camera":{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"},"lens":{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"},"keywords":[{"slug":"bw","title":"B&W"},{"slug":"beach","title":"Beach"},{"slug":"portishead","title":"Portishead"}]},{"id":"4","title":"Untitled","src":"/post-images/4.jpg","captured":1669554959000,"width":2800,"height":2240,"exposure":"1/1600s","aperture":"ƒ/4","iso":"400","focal":"64mm","camera":{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"},"lens":{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"},"keywords":[{"slug":"bw","title":"B&W"},{"slug":"beach","title":"Beach"},{"slug":"portishead","title":"Portishead"}]},{"id":"3","title":"Untitled","src":"/post-images/3.jpg","captured":1669554873000,"width":2240,"height":2800,"exposure":"1/2900s","aperture":"ƒ/4","iso":"400","focal":"64mm","camera":{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"},"lens":{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"},"keywords":[{"slug":"bw","title":"B&W"},{"slug":"beach","title":"Beach"},{"slug":"portishead","title":"Portishead"}]},{"id":"2","title":"Untitled","src":"/post-images/2.jpg","captured":1669554669000,"width":2240,"height":2800,"exposure":"1/800s","aperture":"ƒ/4","iso":"400","focal":"64mm","camera":{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"},"lens":{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"},"keywords":[{"slug":"bw","title":"B&W"},{"slug":"beach","title":"Beach"},{"slug":"portishead","title":"Portishead"},{"slug":"texture","title":"Texture"}]},{"id":"1","title":"Pools","src":"/post-images/1.jpg","captured":1669553998000,"width":2240,"height":2800,"exposure":"1/340s","aperture":"ƒ/4","iso":"400","focal":"64mm","camera":{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"},"lens":{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"},"keywords":[{"slug":"bw","title":"B&W"},{"slug":"beach","title":"Beach"},{"slug":"portishead","title":"Portishead"},{"slug":"texture","title":"Texture"}]}];

export const keywords: SlugValue[] = [{"slug":"beach","title":"Beach"},{"slug":"bw","title":"B&W"},{"slug":"portishead","title":"Portishead"},{"slug":"texture","title":"Texture"}];

export const cameras: SlugValue[] = [{"slug":"fujifilm-gfx50s-ii","title":"Fujifilm GFX50S II"}];

export const lenses: SlugValue[] = [{"slug":"fujifilm-gf-32-64mm-f4","title":"Fujifilm GF 32-64mm f4"}];