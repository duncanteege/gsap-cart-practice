import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-shopping-cart-gsap',
  templateUrl: './shopping-cart-gsap.component.html',
  styleUrls: ['./shopping-cart-gsap.component.scss'],
})
export class ShoppingCartGsapComponent implements OnInit {
  @ViewChildren('item') public items: QueryList<ElementRef>;
  @ViewChildren('cartItemsOpenContainer') public cartItemsOpenContainer: QueryList<ElementRef>;
  @ViewChildren('cartItemsClosedContainer') public cartItemsClosedContainer: QueryList<ElementRef>;

  public cartItems = [0, 1, 2];
  public durationOfAnimation = '0.25';
  public heightClosedContainer = '116px';
  public goingForwards = true;
  public isOpen = false;
  public ease: 'power1.out';

  constructor() { }

  ngOnInit() {
  }

  public toggleCartState() {
    const items = this.items.toArray();
    for (let i = 0; i < items.length; i++) {
      this.flip(items[i].nativeElement, { resize: true, ease: this.ease }, i);
    }
    gsap.to('.close-cart-icon', { rotation: this.isOpen ? 0 : 180, ease: this.ease });
    gsap.to('.cart-container', {
      height: this.isOpen ? '80vh' : this.heightClosedContainer,
      duration: this.durationOfAnimation, ease: this.ease
    });
    gsap.to('.totals', { autoAlpha: this.isOpen ? 1 : 0, display: this.isOpen ? 'block' : 'none', duration: this.durationOfAnimation });
    gsap.to('.content', { opacity: this.isOpen ? 1 : 0, duration: this.durationOfAnimation, ease: this.ease });
    this.isOpen = !this.isOpen;
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
    copy.duration = this.durationOfAnimation;
    copy.onComplete = () => elements.forEach((el, i) => el.style.cssText = after[i].css);
    tl.from(elements, copy);
    return tl;
  }


}
