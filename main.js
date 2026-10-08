/**
 * main.js
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 取扱商品のHover Reveal (画像切り替え) ---
    const productItems = document.querySelectorAll('.product-item');
    const previewImages = document.querySelectorAll('.preview-img');

    if (productItems.length > 0 && previewImages.length > 0) {
        productItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // 対象の画像IDを取得
                const targetImageId = this.getAttribute('data-image');
                
                // 全ての画像を透明(opacity:0)にする
                previewImages.forEach(img => {
                    img.style.opacity = '0';
                    img.classList.remove('z-10');
                });
                
                // 対象の画像だけを表示(opacity:1)にする
                const targetImg = document.getElementById(targetImageId);
                if (targetImg) {
                    targetImg.style.opacity = '1';
                    targetImg.classList.add('z-10');
                }
            });
        });
    }

    // --- 2. スクロール時のヘッダースタイル変化 ---
    // (省略: 前回のコードと同様、ヘッダーにshadowをつけたりborderを変更する処理)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow-sm');
        } else {
            header.classList.remove('shadow-sm');
        }
    }, { passive: true });

});

document.addEventListener('DOMContentLoaded', () => {
    
    // ...既存の処理 (ヘッダースクロール、Hover Reveal等)...

    // --- 全ページ共通: スクロールアニメーション (Intersection Observer) ---
    // アニメーションさせたい要素を取得
    const faders = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
    
    // オプション設定: 要素が画面の10%見えたら発火、下部の判定を少し早める
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // 監視ロジック
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // 画面に入ったら is-visible クラスを付与
                entry.target.classList.add('is-visible');
                // 一度発火したら監視を解除 (再度スクロールしてもアニメーションさせない)
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // 取得した全要素を監視対象に登録
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});
