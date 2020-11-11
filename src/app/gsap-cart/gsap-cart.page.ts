import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-gsap-cart',
  templateUrl: './gsap-cart.page.html',
  styleUrls: ['./gsap-cart.page.scss'],
})
export class GsapCartPage implements OnInit {

  @ViewChildren('item') public items: QueryList<ElementRef>;
  @ViewChildren('cartItemsOpenContainer') public cartItemsOpenContainer: QueryList<ElementRef>;
  @ViewChildren('cartItemsClosedContainer') public cartItemsClosedContainer: QueryList<ElementRef>;

  public cartItems = [0, 1, 2];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public flipTheBox() {
    const items = this.items.toArray();
    for (let i = 0; i < items.length; i++) {
      this.flip(items[i].nativeElement, { resize: true, ease: 'power1.out' }, i);
    }
  }

  private swapPosition(index: number) {
    const items = this.items.toArray();
    const openContainers = this.cartItemsOpenContainer.toArray();
    const closedContainers = this.cartItemsClosedContainer.toArray();
    const parent = items[index].nativeElement.parentNode === closedContainers[index].nativeElement ? openContainers[index].nativeElement : closedContainers[index].nativeElement;
    parent.appendChild(items[index].nativeElement);
  }

  private flip(elements, vars, index) {
    elements = gsap.utils.toArray(elements);
    vars = vars || {};

    const tl = gsap.timeline({ onComplete: vars.onComplete, delay: vars.delay || 0 });
    const getDimensions = el => {
      const b = el.getBoundingClientRect();
      const getProp: any = gsap.getProperty(el);
      return {
        sx: getProp('scaleX'),
        sy: getProp('scaleY'),
        x: getProp('x'),
        y: getProp('y'),
        l: b.left,
        t: b.top,
        w: parseFloat(getProp('width', 'px')),
        h: parseFloat(getProp('height', 'px')),
        bw: b.width,
        bh: b.height,
        css: el.style.cssText,
        origin: getComputedStyle(el).transformOrigin.split(' ').map(parseFloat)
      };
    };

    const before = elements.map(getDimensions);
    const copy: any = {};
    let p: string;
    let after: any;
    elements.forEach(el => {
      el._flip && el._flip.progress(1);
      el._flip = tl;
    });
    this.swapPosition(index);

    after = elements.map(getDimensions);
    for (p in vars) {
      p !== 'onComplete' && p !== 'delay' && p !== 'resize' && (copy[p] = vars[p]);
    }
    if (vars.resize) {
      copy.x = i => after[i].x + (before[i].l - after[i].l);
      copy.y = i => after[i].y + (before[i].t - after[i].t);
      copy.width = i => before[i].w;
      copy.height = i => before[i].h;
    } else {
      copy.x = i => after[i].x + (before[i].l - after[i].l) + ((before[i].bw / after[i].bw) * after[i].sx - after[i].sx) * after[i].origin[0];
      copy.y = i => after[i].y + (before[i].t - after[i].t) + ((before[i].bh / after[i].bh) * after[i].sy - after[i].sy) * after[i].origin[1];
      copy.scaleX = i => after[i].sx * (before[i].bw / after[i].bw);
      copy.scaleY = i => after[i].sy * (before[i].bh / after[i].bh);
    }
    copy.onComplete = () => elements.forEach((el, i) => el.style.cssText = after[i].css);
    return tl.from(elements, copy);
  }


}
