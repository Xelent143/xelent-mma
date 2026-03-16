# Xelent MMA Product Images

## Using Placeholder Images

Replace emoji placeholders with these image URLs:

### Product Images (placehold.co with brand colors)
- BJJ Gi Black: https://placehold.co/600x600/111111/DC2626?text=BJJ+GI+BLACK
- BJJ Gi White: https://placehold.co/600x600/F5F5F5/DC2626?text=BJJ+GI+WHITE  
- Rashguard: https://placehold.co/600x600/1a1a1a/DC2626?text=RASHGUARD
- Fight Shorts: https://placehold.co/600x600/222222/DC2626?text=FIGHT+SHORTS
- Hand Wraps: https://placehold.co/600x600/333333/DC2626?text=HAND+WRAPS
- Cap: https://placehold.co/600x600/0a0a0a/DC2626?text=SNAPBACK+CAP

### Hero/Category Images (Unsplash)
- Hero: https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800
- BJJ Category: https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400
- Training: https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=400

### CSS Changes Needed
Replace emoji divs with:
```html
<img src="https://placehold.co/400x400/1a1a1a/DC2626?text=PRODUCT+NAME" 
     alt="Product Name" 
     style="width:100%;height:100%;object-fit:cover;">
```

Add to .product-image CSS:
```css
.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```