import Editor from "./Editor";
import Renederer from "./Renderer";

const div: HTMLDivElement = document.querySelector(".mesh-grad")!;


const r = new Renederer<HTMLDivElement>(div);
const e = new Editor<HTMLDivElement>(r);

