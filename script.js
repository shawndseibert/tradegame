    document.addEventListener('DOMContentLoaded', () => {
        // --- Indicator Toggles Logic ---
    let showBuySellDots = false;
    let showBullishIndicators = false;
    let showBearishIndicators = false;
    let showTriangleIndicators = false;
    let showFlagIndicators = false;
        const buySellBtn = document.getElementById('toggle-buy-sell-dots');
        const bullishBtn = document.getElementById('toggle-bullish-indicators');
        const bearishBtn = document.getElementById('toggle-bearish-indicators');
    const triangleBtn = document.getElementById('toggle-triangle-indicators');
    const flagBtn = document.getElementById('toggle-flag-indicators');

        function updateIndicatorBtnStyles() {
    buySellBtn.classList.toggle('bg-indigo-600', showBuySellDots);
    buySellBtn.classList.toggle('text-white', showBuySellDots);
    buySellBtn.classList.toggle('bg-gray-700', !showBuySellDots);
    buySellBtn.classList.toggle('text-gray-200', !showBuySellDots);
    buySellBtn.setAttribute('aria-pressed', showBuySellDots);

    bullishBtn.classList.toggle('bg-green-600', showBullishIndicators);
    bullishBtn.classList.toggle('text-white', showBullishIndicators);
    bullishBtn.classList.toggle('bg-gray-700', !showBullishIndicators);
    bullishBtn.classList.toggle('text-gray-200', !showBullishIndicators);
    bullishBtn.setAttribute('aria-pressed', showBullishIndicators);

    bearishBtn.classList.toggle('bg-red-600', showBearishIndicators);
    bearishBtn.classList.toggle('text-white', showBearishIndicators);
    bearishBtn.classList.toggle('bg-gray-700', !showBearishIndicators);
    bearishBtn.classList.toggle('text-gray-200', !showBearishIndicators);
    bearishBtn.setAttribute('aria-pressed', showBearishIndicators);

    triangleBtn.classList.toggle('bg-yellow-600', showTriangleIndicators);
    triangleBtn.classList.toggle('text-white', showTriangleIndicators);
    triangleBtn.classList.toggle('bg-gray-700', !showTriangleIndicators);
    triangleBtn.classList.toggle('text-gray-200', !showTriangleIndicators);
    triangleBtn.setAttribute('aria-pressed', showTriangleIndicators);

    flagBtn.classList.toggle('bg-blue-600', showFlagIndicators);
    flagBtn.classList.toggle('text-white', showFlagIndicators);
    flagBtn.classList.toggle('bg-gray-700', !showFlagIndicators);
    flagBtn.classList.toggle('text-gray-200', !showFlagIndicators);
    flagBtn.setAttribute('aria-pressed', showFlagIndicators);
        }

        buySellBtn.addEventListener('click', () => {
        showBuySellDots = !showBuySellDots;
        updateIndicatorBtnStyles();
        updatePatternOverlays();
        uiNeedsUpdate = true;
        });
        bullishBtn.addEventListener('click', () => {
            showBullishIndicators = !showBullishIndicators;
            updateIndicatorBtnStyles();
            updatePatternOverlays();
            uiNeedsUpdate = true;
        });
        bearishBtn.addEventListener('click', () => {
            showBearishIndicators = !showBearishIndicators;
            updateIndicatorBtnStyles();
            updatePatternOverlays();
            uiNeedsUpdate = true;
        });
    triangleBtn.addEventListener('click', () => {
        showTriangleIndicators = !showTriangleIndicators;
        updateIndicatorBtnStyles();
        updatePatternOverlays();
        uiNeedsUpdate = true;
    });
    flagBtn.addEventListener('click', () => {
        showFlagIndicators = !showFlagIndicators;
        updateIndicatorBtnStyles();
        updatePatternOverlays();
        uiNeedsUpdate = true;
    });
        updateIndicatorBtnStyles();
            // Info modal now only shows info sections, no toggles/buttons
            // Show all info sections by default
            ['info-hs-section','info-dt-section','info-db-section','info-triangle-section','info-flag-section','info-cup-section'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('hidden');
            });
            // --- Pattern Overlay Logic ---
            // Pattern toggle state, now only controlled by info modal
            const patternToggles = {
    hs: false,
    dt: false,
    db: false,
    triangle: false,
    flag: false,
    cup: false
            };
            function updatePatternBtnStyles() { /* No-op, buttons removed */ }

            // Persist overlays for several candles
            const PATTERN_HOLD_CANDLES = 7;
            let patternOverlayCache = {};
            let patternOverlayAge = {};
            function getPatternAnnotations() {
                let buySignal = null, sellSignal = null;
                // ...existing code...
                // (move removal logic to after overlays/dots are added)
                // ...existing code for overlays and dots...
                // ...existing code for overlays and dots...
                // Example shapes, placed using the newest candles
                const annotations = {};
                // ...existing code for overlays and dots population...
                // Set opacity for overlays/dots if toggled off (after annotations is populated)
                if (annotations.hs) annotations.hs.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.hsL) annotations.hsL.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.hsR) annotations.hsR.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.hsHead) annotations.hsHead.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.hsHeadR) annotations.hsHeadR.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.dt1) annotations.dt1.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.dt2) annotations.dt2.borderOpacity = showBearishIndicators ? 1 : 0.2;
                if (annotations.db1) annotations.db1.borderOpacity = showBullishIndicators ? 1 : 0.2;
                if (annotations.db2) annotations.db2.borderOpacity = showBullishIndicators ? 1 : 0.2;
                if (annotations.cup) annotations.cup.borderOpacity = showBullishIndicators ? 1 : 0.2;
                if (annotations.handle) annotations.handle.borderOpacity = showBullishIndicators ? 1 : 0.2;
                if (annotations.buyDot) annotations.buyDot.backgroundOpacity = showBuySellDots ? 1 : 0.2;
                if (annotations.sellDot) annotations.sellDot.backgroundOpacity = showBuySellDots ? 1 : 0.2;
                const data = tradingChart?.data?.datasets[0]?.data || [];
                // Dynamically scale candle requirements by timeframe
                const tf = window.currentTimeframe || 1;
                // Use more candles for higher timeframes
                const minCandles = {
                    hs: Math.max(9, tf * 3),
                    dt: Math.max(7, tf * 2),
                    db: Math.max(7, tf * 2),
                    triangle: Math.max(7, tf * 2),
                    flag: Math.max(9, tf * 3),
                    cup: Math.max(9, tf * 4)
                };
                // Use the last N candles for overlays
                const N = Math.max(9, tf * 4);
                const start = Math.max(0, data.length - N);
                // Helper to get x/y
                function xy(idx, relY) {
                    const i = start + idx;
                    const candle = data[i];
                    if (!candle) return {x: null, y: null};
                    let y = candle.c;
                    if (relY === 1) y = candle.h;
                    if (relY === -1) y = candle.l;
                    return {x: candle.x, y};
                }
                // Helper: simple moving average
                function sma(arr, n) {
                    if (arr.length < n) return null;
                    return arr.slice(-n).reduce((a,b) => a+b,0)/n;
                }
                // Helper: check uptrend/downtrend
                function isUptrend(arr, n) {
                    if (arr.length < n) return false;
                    return arr[arr.length-1] > arr[arr.length-n];
                }
                function isDowntrend(arr, n) {
                    if (arr.length < n) return false;
                    return arr[arr.length-1] < arr[arr.length-n];
                }
                // For each pattern, check if toggled and either recalculate or use cache
                // Refined sticky overlays: keep showing last true result until price action drifts far from detection
                function cacheOrCalc(key, calcFn) {
                    if (!patternToggles[key] || data.length < minCandles[key]) {
                        delete patternOverlayCache[key];
                        return;
                    }
                    const detected = calcFn();
                    const hasPattern = Object.keys(detected).length > 0;
                    // If new pattern detected, update cache
                    if (hasPattern) {
                        patternOverlayCache[key] = detected;
                        patternOverlayCache[key]._refCandle = data[data.length-1]; // Save reference to last candle
                    }
                    // If cache exists, check for drift
                    if (patternOverlayCache[key]) {
                        // If pattern is still present, show overlay
                        if (hasPattern) {
                            Object.assign(annotations, patternOverlayCache[key]);
                        } else {
                            // If price hasn't moved far, keep overlay
                            const ref = patternOverlayCache[key]._refCandle;
                            const curr = data[data.length-1];
                            if (ref && curr && Math.abs(curr.c - ref.c) < 0.03 * ref.c) {
                                Object.assign(annotations, patternOverlayCache[key]);
                            } else {
                                delete patternOverlayCache[key];
                            }
                        }
                    }
                }
                // Set patternToggles for overlays based on toggles
    patternToggles.hs = showBearishIndicators;
    patternToggles.dt = showBearishIndicators;
    patternToggles.db = showBullishIndicators;
    patternToggles.cup = showBullishIndicators;
    patternToggles.triangle = showTriangleIndicators;
    patternToggles.flag = showFlagIndicators;

                // --- Always run pattern detection for dots, even if overlays are off ---
                // Save overlay toggles
                const overlayToggles = { ...patternToggles };
                // Temporarily enable all for dot detection
                patternToggles.hs = true;
                patternToggles.dt = true;
                patternToggles.db = true;
                patternToggles.cup = true;
                // Run pattern detection to update caches (but don't add overlays yet)
                cacheOrCalc('hs', () => {
                    if (data.length < 13) return {};
                    const closes = data.slice(start-4, start+9).map(c=>c.c);
                    if (!isUptrend(closes, 7)) return {};
                    const l = xy(-6,0).y, ls = xy(-4,1).y, h = xy(0,-1).y, rs = xy(4,1).y, r = xy(6,0).y;
                    const avg = sma(closes, 5);
                    if (ls < h && rs < h && h > l && h > r && Math.abs(ls-rs)<0.03*avg) {
                        return {
                            hs: {type:'line', xMin:xy(-6,0).x, xMax:xy(6,0).x, yMin:l, yMax:r, borderColor:'orange', borderWidth:4, label:{display:false,content:'H&S',position:'start',color:'orange'}},
                            hsL: {type:'line', xMin:xy(-6,0).x, xMax:xy(-4,1).x, yMin:l, yMax:ls, borderColor:'orange', borderWidth:4},
                            hsR: {type:'line', xMin:xy(4,1).x, xMax:xy(6,0).x, yMin:rs, yMax:r, borderColor:'orange', borderWidth:4},
                            hsHead: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,-1).x, yMin:ls, yMax:h, borderColor:'orange', borderWidth:4},
                            hsHeadR: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,1).x, yMin:h, yMax:rs, borderColor:'orange', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('dt', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    if (!isUptrend(closes, 5)) return {};
                    const p1 = xy(-4,1).y, dip = xy(0,0).y, p2 = xy(4,1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(p1-p2)<0.01*avg && dip < p1 && dip < p2) {
                        return {
                            dt1: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,1).x, yMin:p1, yMax:p1, borderColor:'red', borderWidth:4, label:{display:false,content:'DT',color:'red'}},
                            dt2: {type:'line', xMin:xy(0,1).x, xMax:xy(4,1).x, yMin:p2, yMax:p2, borderColor:'red', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('db', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    if (!isDowntrend(closes, 5)) return {};
                    const t1 = xy(-4,-1).y, peak = xy(0,0).y, t2 = xy(4,-1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(t1-t2)<0.01*avg && peak > t1 && peak > t2) {
                        return {
                            db1: {type:'line', xMin:xy(-4,-1).x, xMax:xy(0,-1).x, yMin:t1, yMax:t1, borderColor:'green', borderWidth:4, label:{display:false,content:'DB',color:'green'}},
                            db2: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,-1).x, yMin:t2, yMax:t2, borderColor:'green', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('cup', () => {
                    if (data.length < 13) return {};
                    const closes = data.slice(start-6, start+7).map(c=>c.c);
                    if (!isDowntrend(closes, 7)) return {};
                    const left = xy(-6,-1).y, mid = xy(0,-1).y, right = xy(6,0).y;
                    const avg = sma(closes, 7);
                    if (mid < left && mid < right && Math.abs(left-right)<0.05*avg) {
                        return {
                            cup: {type:'line', xMin:xy(-6,-1).x, xMax:xy(0,-1).x, yMin:left, yMax:mid, borderColor:'purple', borderWidth:4, label:{display:false,content:'Cup',color:'purple'}},
                            handle: {type:'line', xMin:xy(0,-1).x, xMax:xy(6,0).x, yMin:mid, yMax:right, borderColor:'purple', borderWidth:4, label:{display:false,content:'Handle',color:'purple'}}
                        };
                    }
                    return {};
                });
                // Restore overlay toggles
                Object.assign(patternToggles, overlayToggles);

                // Always run pattern detection and add overlays
                cacheOrCalc('hs', () => {
                    if (data.length < 13) return {};
                    const closes = data.slice(start-4, start+9).map(c=>c.c);
                    if (!isUptrend(closes, 7)) return {};
                    const l = xy(-6,0).y, ls = xy(-4,1).y, h = xy(0,-1).y, rs = xy(4,1).y, r = xy(6,0).y;
                    const avg = sma(closes, 5);
                    if (ls < h && rs < h && h > l && h > r && Math.abs(ls-rs)<0.03*avg) {
                        return {
                            hs: {type:'line', xMin:xy(-6,0).x, xMax:xy(6,0).x, yMin:l, yMax:r, borderColor:'orange', borderWidth:4, label:{display:false,content:'H&S',position:'start',color:'orange'}},
                            hsL: {type:'line', xMin:xy(-6,0).x, xMax:xy(-4,1).x, yMin:l, yMax:ls, borderColor:'orange', borderWidth:4},
                            hsR: {type:'line', xMin:xy(4,1).x, xMax:xy(6,0).x, yMin:rs, yMax:r, borderColor:'orange', borderWidth:4},
                            hsHead: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,-1).x, yMin:ls, yMax:h, borderColor:'orange', borderWidth:4},
                            hsHeadR: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,1).x, yMin:h, yMax:rs, borderColor:'orange', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('dt', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    if (!isUptrend(closes, 5)) return {};
                    const p1 = xy(-4,1).y, dip = xy(0,0).y, p2 = xy(4,1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(p1-p2)<0.01*avg && dip < p1 && dip < p2) {
                        return {
                            dt1: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,1).x, yMin:p1, yMax:p1, borderColor:'red', borderWidth:4, label:{display:false,content:'DT',color:'red'}},
                            dt2: {type:'line', xMin:xy(0,1).x, xMax:xy(4,1).x, yMin:p2, yMax:p2, borderColor:'red', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('db', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    if (!isDowntrend(closes, 5)) return {};
                    const t1 = xy(-4,-1).y, peak = xy(0,0).y, t2 = xy(4,-1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(t1-t2)<0.01*avg && peak > t1 && peak > t2) {
                        return {
                            db1: {type:'line', xMin:xy(-4,-1).x, xMax:xy(0,-1).x, yMin:t1, yMax:t1, borderColor:'green', borderWidth:4, label:{display:false,content:'DB',color:'green'}},
                            db2: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,-1).x, yMin:t2, yMax:t2, borderColor:'green', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('triangle', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    const max = Math.max(...closes), min = Math.min(...closes);
                    if ((max-min)/min < 0.05) return {};
                    const low1 = xy(-4,-1).y, low2 = xy(4,-1).y, high1 = xy(-4,1).y, high2 = xy(4,1).y;
                    if (high1 > high2 && low1 < low2) {
                        return {
                            tri1: {type:'line', xMin:xy(-4,-1).x, xMax:xy(4,1).x, yMin:low1, yMax:high2, borderColor:'yellow', borderWidth:4, label:{display:false,content:'Triangle',color:'yellow'}},
                            tri2: {type:'line', xMin:xy(-4,1).x, xMax:xy(4,-1).x, yMin:high1, yMax:low2, borderColor:'yellow', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('flag', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-4, start+5).map(c=>c.c);
                    const move = Math.abs(closes[0] - closes[4]);
                    const cons = Math.max(...closes.slice(4)) - Math.min(...closes.slice(4));
                    if (move > 2 * cons) {
                        return {
                            flag1: {type:'line', xMin:xy(-4,0).x, xMax:xy(-2,1).x, yMin:xy(-4,0).y, yMax:xy(-2,1).y, borderColor:'blue', borderWidth:4, label:{display:false,content:'Flag',color:'blue'}},
                            flag2: {type:'line', xMin:xy(-2,1).x, xMax:xy(2,-1).x, yMin:xy(-2,1).y, yMax:xy(2,-1).y, borderColor:'blue', borderWidth:4},
                            flag3: {type:'line', xMin:xy(2,-1).x, xMax:xy(4,0).x, yMin:xy(2,-1).y, yMax:xy(4,0).y, borderColor:'blue', borderWidth:4}
                        };
                    }
                    return {};
                });
                cacheOrCalc('cup', () => {
                    if (data.length < 13) return {};
                    const closes = data.slice(start-6, start+7).map(c=>c.c);
                    if (!isDowntrend(closes, 7)) return {};
                    const left = xy(-6,-1).y, mid = xy(0,-1).y, right = xy(6,0).y;
                    const avg = sma(closes, 7);
                    if (mid < left && mid < right && Math.abs(left-right)<0.05*avg) {
                        return {
                            cup: {type:'line', xMin:xy(-6,-1).x, xMax:xy(0,-1).x, yMin:left, yMax:mid, borderColor:'purple', borderWidth:4, label:{display:false,content:'Cup',color:'purple'}},
                            handle: {type:'line', xMin:xy(0,-1).x, xMax:xy(6,0).x, yMin:mid, yMax:right, borderColor:'purple', borderWidth:4, label:{display:false,content:'Handle',color:'purple'}}
                        };
                    }
                    return {};
                });

                // Always run pattern detection for dots, even if overlays are off
        // Only add dots if their pattern is present and dot toggle is enabled
        if (showBuySellDots) {
            if (patternOverlayCache.db && patternOverlayCache.db._refCandle === data[data.length-1]) {
                annotations.buyDot = {
                    type: 'point', xValue: data[data.length-1].x, yValue: data[data.length-1].c,
                    backgroundColor: 'green', radius: 7, borderColor: 'white', borderWidth: 2,
                    label: {display:true, content:'Buy', color:'white', position:'center'}
                };
            }
            if (patternOverlayCache.cup && patternOverlayCache.cup._refCandle === data[data.length-1]) {
                annotations.buyDot = {
                    type: 'point', xValue: data[data.length-1].x, yValue: data[data.length-1].c,
                    backgroundColor: 'green', radius: 7, borderColor: 'white', borderWidth: 2,
                    label: {display:true, content:'Buy', color:'white', position:'center'}
                };
            }
            if (patternOverlayCache.dt && patternOverlayCache.dt._refCandle === data[data.length-1]) {
                annotations.sellDot = {
                    type: 'point', xValue: data[data.length-1].x, yValue: data[data.length-1].c,
                    backgroundColor: 'red', radius: 7, borderColor: 'white', borderWidth: 2,
                    label: {display:true, content:'Sell', color:'white', position:'center'}
                };
            }
            if (patternOverlayCache.hs && patternOverlayCache.hs._refCandle === data[data.length-1]) {
                annotations.sellDot = {
                    type: 'point', xValue: data[data.length-1].x, yValue: data[data.length-1].c,
                    backgroundColor: 'red', radius: 7, borderColor: 'white', borderWidth: 2,
                    label: {display:true, content:'Sell', color:'white', position:'center'}
                };
            }
        }
                // Head & Shoulders (bearish)
                if (showBearishIndicators) cacheOrCalc('hs', () => {
                    // Use 13 candles for context
                    if (data.length < 13) return {};
                    const closes = data.slice(start-4, start+9).map(c=>c.c);
                    // Require uptrend before pattern
                    if (!isUptrend(closes, 7)) return {};
                    // Shoulders and head
                    const l = xy(-6,0).y, ls = xy(-4,1).y, h = xy(0,-1).y, rs = xy(4,1).y, r = xy(6,0).y;
                    // Smoothing with SMA
                    const avg = sma(closes, 5);
                    if (ls < h && rs < h && h > l && h > r && Math.abs(ls-rs)<0.03*avg) {
                        return {
                            hs: {type:'line', xMin:xy(-6,0).x, xMax:xy(6,0).x, yMin:l, yMax:r, borderColor:'orange', borderWidth:4, label:{display:false,content:'H&S',position:'start',color:'orange'}},
                            hsL: {type:'line', xMin:xy(-6,0).x, xMax:xy(-4,1).x, yMin:l, yMax:ls, borderColor:'orange', borderWidth:4},
                            hsR: {type:'line', xMin:xy(4,1).x, xMax:xy(6,0).x, yMin:rs, yMax:r, borderColor:'orange', borderWidth:4},
                            hsHead: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,-1).x, yMin:ls, yMax:h, borderColor:'orange', borderWidth:4},
                            hsHeadR: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,1).x, yMin:h, yMax:rs, borderColor:'orange', borderWidth:4}
                        };
                    }
                    return {};
                });
                // Double Top (bearish)
                if (showBearishIndicators) cacheOrCalc('dt', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    // Require uptrend before pattern
                    if (!isUptrend(closes, 5)) return {};
                    // Two peaks separated by dip
                    const p1 = xy(-4,1).y, dip = xy(0,0).y, p2 = xy(4,1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(p1-p2)<0.01*avg && dip < p1 && dip < p2) {
                        return {
                            dt1: {type:'line', xMin:xy(-4,1).x, xMax:xy(0,1).x, yMin:p1, yMax:p1, borderColor:'red', borderWidth:4, label:{display:false,content:'DT',color:'red'}},
                            dt2: {type:'line', xMin:xy(0,1).x, xMax:xy(4,1).x, yMin:p2, yMax:p2, borderColor:'red', borderWidth:4}
                        };
                    }
                    return {};
                });
                // Double Bottom (bullish)
                if (showBullishIndicators) cacheOrCalc('db', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    // Require downtrend before pattern
                    if (!isDowntrend(closes, 5)) return {};
                    // Two troughs separated by peak
                    const t1 = xy(-4,-1).y, peak = xy(0,0).y, t2 = xy(4,-1).y;
                    const avg = sma(closes, 5);
                    if (Math.abs(t1-t2)<0.01*avg && peak > t1 && peak > t2) {
                        return {
                            db1: {type:'line', xMin:xy(-4,-1).x, xMax:xy(0,-1).x, yMin:t1, yMax:t1, borderColor:'green', borderWidth:4, label:{display:false,content:'DB',color:'green'}},
                            db2: {type:'line', xMin:xy(0,-1).x, xMax:xy(4,-1).x, yMin:t2, yMax:t2, borderColor:'green', borderWidth:4}
                        };
                    }
                    return {};
                });
                // Triangle (neutral)
                cacheOrCalc('triangle', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-2, start+7).map(c=>c.c);
                    // Require consolidation (low volatility)
                    const max = Math.max(...closes), min = Math.min(...closes);
                    if ((max-min)/min < 0.05) return {};
                    // Converging highs and lows
                    const low1 = xy(-4,-1).y, low2 = xy(4,-1).y, high1 = xy(-4,1).y, high2 = xy(4,1).y;
                    if (high1 > high2 && low1 < low2) {
                        return {
                            tri1: {type:'line', xMin:xy(-4,-1).x, xMax:xy(4,1).x, yMin:low1, yMax:high2, borderColor:'yellow', borderWidth:4, label:{display:false,content:'Triangle',color:'yellow'}},
                            tri2: {type:'line', xMin:xy(-4,1).x, xMax:xy(4,-1).x, yMin:high1, yMax:low2, borderColor:'yellow', borderWidth:4}
                        };
                    }
                    return {};
                });
                // Flag/Pennant (neutral)
                cacheOrCalc('flag', () => {
                    if (data.length < 9) return {};
                    const closes = data.slice(start-4, start+5).map(c=>c.c);
                    // Require sharp move (trend) then consolidation
                    const move = Math.abs(closes[0] - closes[4]);
                    const cons = Math.max(...closes.slice(4)) - Math.min(...closes.slice(4));
                    if (move > 2 * cons) {
                        return {
                            flag1: {type:'line', xMin:xy(-4,0).x, xMax:xy(-2,1).x, yMin:xy(-4,0).y, yMax:xy(-2,1).y, borderColor:'blue', borderWidth:4, label:{display:false,content:'Flag',color:'blue'}},
                            flag2: {type:'line', xMin:xy(-2,1).x, xMax:xy(2,-1).x, yMin:xy(-2,1).y, yMax:xy(2,-1).y, borderColor:'blue', borderWidth:4},
                            flag3: {type:'line', xMin:xy(2,-1).x, xMax:xy(4,0).x, yMin:xy(2,-1).y, yMax:xy(4,0).y, borderColor:'blue', borderWidth:4}
                        };
                    }
                    return {};
                });
                // Cup & Handle (bullish)
                if (showBullishIndicators) cacheOrCalc('cup', () => {
                    if (data.length < 13) return {};
                    const closes = data.slice(start-6, start+7).map(c=>c.c);
                    // Require downtrend before pattern
                    if (!isDowntrend(closes, 7)) return {};
                    // Rounded bottom then small consolidation
                    const left = xy(-6,-1).y, mid = xy(0,-1).y, right = xy(6,0).y;
                    const avg = sma(closes, 7);
                    if (mid < left && mid < right && Math.abs(left-right)<0.05*avg) {
                        return {
                            cup: {type:'line', xMin:xy(-6,-1).x, xMax:xy(0,-1).x, yMin:left, yMax:mid, borderColor:'purple', borderWidth:4, label:{display:false,content:'Cup',color:'purple'}},
                            handle: {type:'line', xMin:xy(0,-1).x, xMax:xy(6,0).x, yMin:mid, yMax:right, borderColor:'purple', borderWidth:4, label:{display:false,content:'Handle',color:'purple'}}
                        };
                    }
                    return {};
                });

                // Set buy/sell signals BEFORE using them
                if (patternOverlayCache.db && patternOverlayCache.db._refCandle === data[data.length-1]) {
                    buySignal = { x: data[data.length-1].x, y: data[data.length-1].c };
                }
                if (patternOverlayCache.cup && patternOverlayCache.cup._refCandle === data[data.length-1]) {
                    buySignal = { x: data[data.length-1].x, y: data[data.length-1].c };
                }
                if (patternOverlayCache.dt && patternOverlayCache.dt._refCandle === data[data.length-1]) {
                    sellSignal = { x: data[data.length-1].x, y: data[data.length-1].c };
                }
                if (patternOverlayCache.hs && patternOverlayCache.hs._refCandle === data[data.length-1]) {
                    sellSignal = { x: data[data.length-1].x, y: data[data.length-1].c };
                }
                // Show dots if toggled on
                if (showBuySellDots) {
                    if (buySignal) {
                        annotations.buyDot = {
                            type: 'point', xValue: buySignal.x, yValue: buySignal.y,
                            backgroundColor: 'green', radius: 7, borderColor: 'white', borderWidth: 2,
                            label: {display:true, content:'Buy', color:'white', position:'center'}
                        };
                    }
                    if (sellSignal) {
                        annotations.sellDot = {
                            type: 'point', xValue: sellSignal.x, yValue: sellSignal.y,
                            backgroundColor: 'red', radius: 7, borderColor: 'white', borderWidth: 2,
                            label: {display:true, content:'Sell', color:'white', position:'center'}
                        };
                    }
                }
                return annotations;
            }

            function updatePatternOverlays() {
                if (!tradingChart) return;
                const anns = getPatternAnnotations();
                // Remove previous pattern overlays
                Object.keys(tradingChart.options.plugins.annotation.annotations).forEach(key => {
                    if (["hs","hsL","hsR","hsHead","hsHeadR","dt1","dt2","db1","db2","tri1","tri2","flag1","flag2","flag3","cup","handle"].includes(key)) {
                        delete tradingChart.options.plugins.annotation.annotations[key];
                    }
                });
                Object.assign(tradingChart.options.plugins.annotation.annotations, anns);
                tradingChart.update();
            }

            // Remove old checkbox event listener logic (now handled by buttons)

            // Always update overlays when chart data changes, but only if tradingChart is initialized
            const origRenderLoop = renderLoop;
            renderLoop = function() {
                origRenderLoop.apply(this, arguments);
                if (typeof tradingChart !== 'undefined' && tradingChart) {
                    updatePatternOverlays();
                }
            }
            // Info button for trading patterns modal
            const infoBtn = document.getElementById('info-patterns-btn');
            const modal = document.getElementById('patterns-info-modal');
            const closeModal = document.getElementById('close-patterns-info');
            infoBtn.addEventListener('click', () => {
                modal.classList.remove('hidden');
            });
            closeModal.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.add('hidden');
            });
            // Chart panel collapse logic
            let chartPanelCollapsed = true;
            const chartToggleBtn = document.getElementById('chart-toggle-btn');
            const chartControls = document.getElementById('chart-controls');
            const chartContainer = document.getElementById('chart-container');
            function setChartPanelState(collapsed) {
                chartPanelCollapsed = collapsed;
                const timeframeRow = chartControls.children[0];
                const timeframeLabel = timeframeRow.querySelector('label');
                const candleBtn = timeframeRow.querySelector('#candle-toggle-btn');
                const patternTogglesPanel = document.getElementById('pattern-toggles-panel');
                if (chartPanelCollapsed) {
                    // Hide all except timeframe buttons
                    chartControls.querySelectorAll(':scope > div:not(:first-child)').forEach(el => el.style.display = 'none');
                    if (timeframeLabel) timeframeLabel.style.display = 'none';
                    if (candleBtn) candleBtn.style.display = 'none';
                    if (patternTogglesPanel) patternTogglesPanel.style.display = 'none';
                    chartToggleBtn.textContent = 'Expand';
                    chartContainer.classList.remove('min-h-[300px]');
                    chartContainer.classList.add('min-h-[200px]');
                } else {
                    chartControls.querySelectorAll(':scope > div').forEach(el => el.style.display = '');
                    if (timeframeLabel) timeframeLabel.style.display = '';
                    if (candleBtn) candleBtn.style.display = '';
                    if (patternTogglesPanel) patternTogglesPanel.style.display = '';
                    chartToggleBtn.textContent = 'Collapse';
                    chartContainer.classList.remove('min-h-[200px]');
                    chartContainer.classList.add('min-h-[300px]');
                }
            }
            chartToggleBtn.addEventListener('click', () => {
                setChartPanelState(!chartPanelCollapsed);
            });
            // Collapse chart panel by default
            setChartPanelState(true);
            // Collapse logic
            let accountPanelCollapsed = true;
            const accountToggleBtn = document.getElementById('account-toggle-btn');
            const accountTradeControls = document.getElementById('account-trade-controls');
            const tradeSizeRow = document.getElementById('trade-size-row');
            function setAccountPanelState(collapsed) {
                accountPanelCollapsed = collapsed;
                const balanceLabel = document.getElementById('balance-label');
                const lastPlLabel = document.getElementById('last-pl-label');
                const unrealizedPlLabel = document.getElementById('unrealized-pl-label');
                const positionsPanel = document.getElementById('positions-panel');
                const isDesktop = window.innerWidth > 640;
                if (!tradeSizeRow || !accountToggleBtn) return;
                if (accountPanelCollapsed) {
                    tradeSizeRow.style.display = 'none';
                    accountToggleBtn.textContent = 'Expand';
                    if (balanceLabel) balanceLabel.classList.add('hidden');
                    if (lastPlLabel) lastPlLabel.classList.add('hidden');
                    if (unrealizedPlLabel) unrealizedPlLabel.classList.add('hidden');
                    if (positionsPanel) positionsPanel.style.display = isDesktop ? '' : 'none';
                } else {
                    tradeSizeRow.style.display = '';
                    accountToggleBtn.textContent = 'Collapse';
                    if (balanceLabel) balanceLabel.classList.remove('hidden');
                    if (lastPlLabel) lastPlLabel.classList.remove('hidden');
                    if (unrealizedPlLabel) unrealizedPlLabel.classList.remove('hidden');
                    if (positionsPanel) positionsPanel.style.display = '';
                }
            }
            accountToggleBtn.addEventListener('click', () => {
                setAccountPanelState(!accountPanelCollapsed);
            });
            // Collapse account panel by default
            setAccountPanelState(true);
            // Single candle type toggle button logic
            let candleType = 'candlestick';
            // Persist candleType in localStorage
            const CANDLE_TYPE_KEY = 'tradegame_candleType';
            const savedCandleType = localStorage.getItem(CANDLE_TYPE_KEY);
            if (savedCandleType === 'heikinashi' || savedCandleType === 'candlestick') {
                candleType = savedCandleType;
            }
            const candleToggleBtn = document.getElementById('candle-toggle-btn');
            function updateCandleToggleBtn() {
                if (candleType === 'candlestick') {
                    candleToggleBtn.textContent = 'CS';
                } else {
                    candleToggleBtn.textContent = 'HA';
                }
                candleToggleBtn.classList.remove('bg-indigo-600', 'text-white');
                candleToggleBtn.classList.add('bg-gray-700', 'text-gray-200', 'hover:bg-gray-600');
            }
            updateCandleToggleBtn();
            candleToggleBtn.addEventListener('click', () => {
                candleType = (candleType === 'candlestick') ? 'heikinashi' : 'candlestick';
                localStorage.setItem(CANDLE_TYPE_KEY, candleType);
                updateCandleToggleBtn();
                uiNeedsUpdate = true;
            });
            // --- DOM Element References ---
            const balanceEl = document.getElementById('balance');
            const unrealizedPlEl = document.getElementById('unrealized-pl');
            const leverageSlider = document.getElementById('leverage');
            const leverageValueEl = document.getElementById('leverage-value');
            const tradeSizeInput = document.getElementById('trade-size');
            const longButton = document.getElementById('long-button');
            const shortButton = document.getElementById('short-button');
            const positionsListEl = document.getElementById('positions-list');
            const noPositionsMsgEl = document.getElementById('no-positions-msg');
            const speedSlider = document.getElementById('speed-slider');
            const speedValueEl = document.getElementById('speed-value');
            const resetViewBtn = document.getElementById('reset-view-btn');
            const timeframeButtons = document.querySelectorAll('.timeframe-btn');
            const sizePercentageButtonsEl = document.getElementById('size-percentage-buttons');

            // --- Game State ---
            // --- Persistent Game State ---
            function loadGameState() {
                const saved = localStorage.getItem('tradegame_state');
                if (!saved) return null;
                try {
                    return JSON.parse(saved);
                } catch {
                    return null;
                }
            }
            function saveGameState() {
                localStorage.setItem('tradegame_state', JSON.stringify({
                    account,
                    openPositions,
                    tradeHistory,
                    masterOneMinuteData,
                    lastPrice,
                    lastTime
                }));
            }
            let account, openPositions, tradeHistory, masterOneMinuteData, lastPrice, lastTime;
            let gameLoopInterval;
            const MAX_DATA_POINTS = 10000;
            const persisted = loadGameState();
            if (persisted) {
                account = persisted.account;
                openPositions = persisted.openPositions;
                tradeHistory = persisted.tradeHistory;
                masterOneMinuteData = persisted.masterOneMinuteData;
                lastPrice = persisted.lastPrice;
                lastTime = persisted.lastTime;
            } else {
                account = { balance: 10000, equity: 10000 };
                openPositions = [];
                tradeHistory = [];
                masterOneMinuteData = [];
                lastPrice = 50000;
                lastTime = new Date().getTime();
            }

            // --- Chart.js State ---
            const ctx = document.getElementById('trading-chart').getContext('2d');
            let tradingChart;
            let uiNeedsUpdate = true;
            const DEFAULT_VISIBLE_CANDLES = 50;
            const MIN_VISIBLE_CANDLES = 20;
            let visibleCandleCount = DEFAULT_VISIBLE_CANDLES;
            let currentTimeframe = 5;

            // --- Timeframe Button Logic ---
            function setActiveTimeframeButton(timeframe) {
                timeframeButtons.forEach(btn => {
                    if (btn.getAttribute('data-timeframe') === timeframe.toString()) {
                        btn.classList.add('bg-indigo-600', 'text-white');
                        btn.classList.remove('bg-gray-700', 'text-gray-200', 'hover:bg-gray-600');
                    } else {
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-gray-700', 'text-gray-200', 'hover:bg-gray-600');
                    }
                });
            }
            setActiveTimeframeButton(currentTimeframe);
            timeframeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tf = parseInt(btn.getAttribute('data-timeframe'));
                    if (tf !== currentTimeframe) {
                        currentTimeframe = tf;
                        setActiveTimeframeButton(currentTimeframe);
                        uiNeedsUpdate = true;
                        // If you have a function to reload chart data, call it here
                        // reloadChartData(currentTimeframe);
                    }
                });
            });
            // --- Chart.js Setup ---
            function createChart(persistedAnnotations = {}) {
                if (tradingChart) tradingChart.destroy();
                // Custom plugin to draw a tag on the y-axis price label for the current price
                const priceTagPlugin = {
                    id: 'priceTagPlugin',
                    afterDraw: (chart) => {
                        const yScale = chart.scales.y;
                        if (!yScale) return;
                        const lastData = chart.data.datasets[0].data;
                        if (!lastData || lastData.length === 0) return;
                        const lastCandle = lastData[lastData.length - 1];
                        const lastPrice = lastCandle.c;
                        // Find pixel for lastPrice
                        const yPixel = yScale.getPixelForValue(lastPrice);
                        // Find right edge of chart area
                        const chartArea = chart.chartArea;
                        const xRight = chartArea.right + 8;
                        const ctx = chart.ctx;
                        // Abbreviate price (e.g., 50,000 -> 50K)
                        function abbreviatePrice(price) {
                            if (price >= 1e9) return (price/1e9).toFixed(2) + 'B';
                            if (price >= 1e6) return (price/1e6).toFixed(2) + 'M';
                            if (price >= 1e3) return (price/1e3).toFixed(2) + 'K';
                            return price.toFixed(2);
                        }
                        const tagText = abbreviatePrice(lastPrice);
                        ctx.font = 'bold 12px Inter, sans-serif';
                        const textWidth = ctx.measureText(tagText).width;
                        const tagHeight = 22;
                        const tagWidth = textWidth + 16;
                        // Match color of dynamic price line
                        let color = 'rgba(156,163,175,0.75)'; // neutral gray
                        if (lastCandle.c > lastCandle.o) color = 'rgba(38,166,154,0.75)'; // green
                        else if (lastCandle.c < lastCandle.o) color = 'rgba(239,83,80,0.75)'; // red
                        ctx.save();
                        ctx.beginPath();
                        ctx.fillStyle = color;
                        ctx.roundRect(xRight, yPixel - tagHeight/2, tagWidth, tagHeight, 8);
                        ctx.fill();
                        ctx.fillStyle = '#fff';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(tagText, xRight + 8, yPixel);
                        ctx.restore();
                    }
                };
                const config = {
                    type: 'candlestick',
                    data: { datasets: [{ label: 'Price', data: [] }] },
                    options: {
                        responsive: true, maintainAspectRatio: false, animation: false,
                        layout: {
                            padding: {
                                right: 20 // Further reduce right padding for price tag visibility
                            }
                        },
                        scales: {
                            x: { type: 'time', time: { unit: 'minute' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, ticks: { color: '#E0E0E0' } },
                            y: {
                                position: 'right', // Move price labels to the right
                                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                                ticks: { color: '#E0E0E0' }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            annotation: { annotations: persistedAnnotations },
                            tooltip: { enabled: false },
                            zoom: {
                                pan: { enabled: false },
                                zoom: {
                                    wheel: { enabled: true }, mode: 'x',
                                    onZoom: ({ chart }) => {
                                        const timespan = chart.scales.x.max - chart.scales.x.min;
                                        const timeframeMillis = currentTimeframe * 60 * 1000;
                                        const newCandleCount = Math.round(timespan / timeframeMillis);
                                        visibleCandleCount = Math.max(MIN_VISIBLE_CANDLES, newCandleCount);
                                        uiNeedsUpdate = true;
                                    }
                                }
                            }
                        }
                    },
                    plugins: [priceTagPlugin]
                };
                tradingChart = new Chart(ctx, config);
            }

            // --- Data Generation & Transformation ---
            function generateOneMinuteCandle() {
                const changePercent = (Math.random() - 0.5) * 0.005;
                const change = lastPrice * changePercent;
                const open = lastPrice; const close = open + change;
                const high = Math.max(open, close) + (Math.random() * Math.abs(change) * 2);
                const low = Math.min(open, close) - (Math.random() * Math.abs(change) * 2);
                lastPrice = close; lastTime += 60000;
                return { x: lastTime, o: open, h: high, l: low, c: close };
            }

            function regenerateMasterData() {
                masterOneMinuteData = []; lastPrice = 50000;
                const historyMinutes = 5000;
                lastTime = new Date().getTime() - (historyMinutes * 60000);
                for (let i = 0; i < historyMinutes; i++) masterOneMinuteData.push(generateOneMinuteCandle());
            }

            function aggregateData(data, timeframeMinutes) {
                if (timeframeMinutes <= 1) return data;
                const aggregated = [];
                let currentCandle = null;
                for (const candle of data) {
                    const candleTime = new Date(candle.x);
                    const intervalStart = new Date(candleTime);
                    intervalStart.setMinutes(Math.floor(candleTime.getMinutes() / timeframeMinutes) * timeframeMinutes, 0, 0);
                    if (!currentCandle || currentCandle.x !== intervalStart.getTime()) {
                        if (currentCandle) aggregated.push(currentCandle);
                        currentCandle = { x: intervalStart.getTime(), o: candle.o, h: candle.h, l: candle.l, c: candle.c };
                    } else {
                        currentCandle.h = Math.max(currentCandle.h, candle.h);
                        currentCandle.l = Math.min(currentCandle.l, candle.l);
                        currentCandle.c = candle.c;
                    }
                }
                if (currentCandle) aggregated.push(currentCandle);
                return aggregated;
            }
            
            // End Game Modal logic
            // ...existing code...
            // Developer Menu logic
            const devMenu = document.getElementById('dev-menu');
            const devNewGameBtn = document.getElementById('dev-newgame-btn');
            const devCloseBtn = document.getElementById('dev-close-btn');
            const devTouchArea = document.getElementById('dev-touch-area');
            let touchTimer = null;
            function openDevMenu() {
                devMenu.classList.remove('hidden');
            }
            function closeDevMenu() {
                devMenu.classList.add('hidden');
            }
            document.addEventListener('keydown', (e) => {
                if (e.key === '`') {
                    if (devMenu.classList.contains('hidden')) openDevMenu();
                    else closeDevMenu();
                }
            });
            devCloseBtn.addEventListener('click', closeDevMenu);
            devNewGameBtn.addEventListener('click', () => {
    // Reset game state and localStorage
    localStorage.removeItem('tradegame_state');
        // Reset in-memory state
        account = { balance: 10000, equity: 10000 };
        openPositions = [];
        tradeHistory = [];
        // Preload price data with 5000 candles
        function preloadPriceData() {
            masterOneMinuteData = [];
            lastPrice = 50000;
            const historyMinutes = 5000;
            lastTime = new Date().getTime() - (historyMinutes * 60000);
            for (let i = 0; i < historyMinutes; i++) masterOneMinuteData.push(generateOneMinuteCandle());
        }
        preloadPriceData();
    // Update UI
    if (typeof updateAccountUI === 'function') updateAccountUI();
    if (typeof updatePositionsUI === 'function') updatePositionsUI();
    if (typeof updateHistoryUI === 'function') updateHistoryUI();
    if (typeof updatePatternOverlays === 'function') updatePatternOverlays();
    if (typeof tradingChart !== 'undefined' && tradingChart) tradingChart.update();
    // Optionally reload page for full reset
    // location.reload();
            });
            // Mobile: hold top right to open dev menu
            devTouchArea.addEventListener('touchstart', () => {
                if (touchTimer) clearTimeout(touchTimer);
                touchTimer = setTimeout(() => {
                    openDevMenu();
                }, 1200); // 1.2 seconds hold
            });
            devTouchArea.addEventListener('touchend', () => {
                if (touchTimer) clearTimeout(touchTimer);
            });
        function showEndGame() {
            if (window.gameOver) return;
            window.gameOver = true;
            // Gather stats
            const totalTrades = tradeHistory.length;
            const totalLongs = tradeHistory.filter(t => t.type === 'long').length;
            const totalShorts = tradeHistory.filter(t => t.type === 'short').length;
            const totalPL = tradeHistory.reduce((sum, t) => sum + (t.closedPnl || 0), 0);
            const maxBalance = Math.max(...tradeHistory.map(t => t.balance || 10000), 10000);
            const statsHtml = `
                <div class='mb-2'>Final Balance: <span class='text-red-400 font-bold'>$0.00</span></div>
                <div>Total Trades: <span class='font-bold'>${totalTrades}</span></div>
                <div>Longs: <span class='text-green-400 font-bold'>${totalLongs}</span> | Shorts: <span class='text-red-400 font-bold'>${totalShorts}</span></div>
                <div>Total P/L: <span class='font-bold ${totalPL >= 0 ? 'text-green-400' : 'text-red-400'}'>$${totalPL.toFixed(2)}</span></div>
            `;
            document.getElementById('endgame-stats').innerHTML = statsHtml;
            document.getElementById('endgame-modal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            // Freeze the game by stopping the game loop
            if (gameLoopInterval) clearInterval(gameLoopInterval);
        }
            // --- Game & Render Loops ---
            function gameLoop() {
                masterOneMinuteData.push(generateOneMinuteCandle());
                if (masterOneMinuteData.length > MAX_DATA_POINTS) masterOneMinuteData.shift();

                let totalPnl = 0;
                // Liquidation logic
                // Get the latest candle
                let latestCandle = masterOneMinuteData[masterOneMinuteData.length - 1];
                for (let i = openPositions.length - 1; i >= 0; i--) {
                    const pos = openPositions[i];
                    const priceDiff = lastPrice - pos.entryPrice;
                    const quantity = (pos.margin * pos.leverage) / pos.entryPrice;
                    pos.pnl = (pos.type === 'long') ? priceDiff * quantity : -priceDiff * quantity;
                    // Calculate liquidation price
                    let liquidationPrice;
                    let wickLiquidated = false;
                    if (pos.type === 'long') {
                        liquidationPrice = pos.entryPrice - (pos.entryPrice / pos.leverage);
                        // Liquidate if candle's low crosses liquidation price
                        if (latestCandle.l <= liquidationPrice) {
                            wickLiquidated = true;
                        }
                    } else {
                        liquidationPrice = pos.entryPrice + (pos.entryPrice / pos.leverage);
                        // Liquidate if candle's high crosses liquidation price
                        if (latestCandle.h >= liquidationPrice) {
                            wickLiquidated = true;
                        }
                    }
                    if (wickLiquidated) {
                        // Add to trade history
                        tradeHistory.push({
                            ...pos,
                            closedPrice: liquidationPrice,
                            closedPnl: -pos.margin, // Margin lost
                            closedAt: new Date().getTime(),
                            reason: 'Liquidated'
                        });
                        delete tradingChart.options.plugins.annotation.annotations[pos.id];
                        delete tradingChart.options.plugins.annotation.annotations[pos.id + '_liq'];
                        document.getElementById(pos.id)?.remove();
                        openPositions.splice(i, 1);
                        showMessage(`Liquidated ${pos.type.toUpperCase()} @ ${liquidationPrice.toFixed(2)} (wick). Margin lost.`, 'error');
                        continue;
                    }
                    totalPnl += pos.pnl;
                }
                account.equity = account.balance + totalPnl;
                // Save game state after each tick
                saveGameState();
                // Show end game only if balance is zero and no open positions
                if (account.balance <= 0.0001 && openPositions.length === 0) {
                    // Clear localStorage to start a new game next reload
                    localStorage.removeItem('tradegame_state');
                    showEndGame();
                }
                uiNeedsUpdate = true;
            }

            // Helper: get active percent button value
function getActivePercent() {
    const btns = Array.from(sizePercentageButtonsEl.children);
    for (const btn of btns) {
        if (btn.classList.contains('bg-indigo-600')) {
            return parseFloat(btn.dataset.percent);
        }
    }
    return null;
}

// Update trade size input if percent button is active
function updateTradeSizeFromPercent() {
    const percent = getActivePercent();
    if (percent !== null) {
        tradeSizeInput.value = (account.balance * percent).toFixed(2);
    }
}

            function renderLoop() {
                if (uiNeedsUpdate && masterOneMinuteData.length > 0) {
                    const aggregatedData = aggregateData(masterOneMinuteData, currentTimeframe);
                    if (aggregatedData.length === 0) { requestAnimationFrame(renderLoop); return; }
                    let displayData = (candleType === 'heikinashi') ? toHeikinAshi(aggregatedData) : aggregatedData;
                    tradingChart.data.datasets[0].data = displayData;

                    // --- Current Price Line Annotation ---
                    const lastCandle = displayData[displayData.length - 1];
                    const lastPrice = lastCandle.c;
                    let color = 'rgba(156,163,175,0.75)'; // neutral gray, 75% opacity
                    if (lastCandle.c > lastCandle.o) color = 'rgba(38,166,154,0.75)'; // green matches long position (#26A69A)
                    else if (lastCandle.c < lastCandle.o) color = 'rgba(239,83,80,0.75)'; // red matches short position (#EF5350)

                    // Remove previous annotations if exist
                    if (tradingChart.options.plugins.annotation.annotations.currentPriceLine) {
                        delete tradingChart.options.plugins.annotation.annotations.currentPriceLine;
                    }
                    if (tradingChart.options.plugins.annotation.annotations.currentPriceLine) {
                        delete tradingChart.options.plugins.annotation.annotations.currentPriceLine;
                    }
                    tradingChart.options.plugins.annotation.annotations.currentPriceLine = {
                        type: 'line',
                        yMin: lastPrice,
                        yMax: lastPrice,
                        borderColor: color,
                        borderWidth: 2,
                        borderDash: [4, 4],
                        borderOpacity: 0.85,
                        z: 10000
                    };

                    const lastCandleTime = lastCandle.x;
                    const firstVisibleCandleIndex = Math.max(0, displayData.length - visibleCandleCount);
                    const firstVisibleCandleTime = displayData[firstVisibleCandleIndex].x;
                    tradingChart.options.scales.x.max = lastCandleTime;
                    tradingChart.options.scales.x.min = firstVisibleCandleTime;
                    // Set y-axis min/max based on visible candles only
                    const visibleCandles = displayData.slice(firstVisibleCandleIndex);
                    const yMin = Math.min(...visibleCandles.map(c => c.l));
                    const yMax = Math.max(...visibleCandles.map(c => c.h));
                    tradingChart.options.scales.y.min = yMin;
                    tradingChart.options.scales.y.max = yMax;
                    tradingChart.update('none');

                    // Abbreviate balance if account panel is collapsed
                    if (accountPanelCollapsed) {
                        balanceEl.textContent = abbreviateBalance(account.balance);
                    } else {
                        balanceEl.textContent = `$${account.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    }
                    // Always update margin if percent button is active
                    updateTradeSizeFromPercent();

                    // Update live P/L (unrealized)
                    const unrealizedPlEl = document.getElementById('unrealized-pl');
                    const totalPnl = account.equity - account.balance;
                    unrealizedPlEl.textContent = `$${totalPnl.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    unrealizedPlEl.style.color = totalPnl >= 0 ? '#4ade80' : '#f87171';

                    // Update last P/L (last closed position)
                    const lastPlEl = document.getElementById('last-pl');
                    const lastClosedPl = window.lastClosedPl ?? 0;
                    lastPlEl.textContent = `$${lastClosedPl.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                    lastPlEl.style.color = lastClosedPl >= 0 ? '#4ade80' : '#f87171';

                    updatePositionsList();
                    uiNeedsUpdate = false;
                }
                requestAnimationFrame(renderLoop);
            }
            
            // --- Initial Setup ---
            function init() {
                // Set 25% margin button as default
                const sizeButtons = document.querySelectorAll('#size-percentage-buttons button');
                if (sizeButtons.length > 0) {
                    sizeButtons.forEach((btn, i) => {
                        if (i === 0) {
                            btn.classList.add('bg-indigo-600', 'text-white');
                            btn.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                        } else {
                            btn.classList.remove('bg-indigo-600', 'text-white');
                            btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
                        }
                    });
                    // Update trade size input to 25%
                    const tradeSizeInput = document.getElementById('trade-size');
                    if (tradeSizeInput) tradeSizeInput.value = (account.balance * 0.25).toFixed(2);
                }
                // Set leverage slider to far left (1x)
                const leverageSlider = document.getElementById('leverage');
                const leverageValueEl = document.getElementById('leverage-value');
                if (leverageSlider) leverageSlider.value = 1;
                if (leverageValueEl) leverageValueEl.textContent = '1x';
                // Set 1h timeframe button as default
                currentTimeframe = 60;
                setActiveTimeframeButton(currentTimeframe);
                if (!persisted) {
                    regenerateMasterData();
                }
                createChart();
                // Set speed slider to far left (1x)
                const speedSlider = document.getElementById('speed-slider');
                const speedValueEl = document.getElementById('speed-value');
                if (speedSlider) speedSlider.value = 1;
                if (speedValueEl) speedValueEl.textContent = '1x';
                setGameSpeed(1);
                requestAnimationFrame(renderLoop);
            }

            // --- Event Listeners ---
            // Close Long/Short buttons (mobile)
            const closeLongBtn = document.getElementById('close-long-button');
            const closeShortBtn = document.getElementById('close-short-button');
            if (closeLongBtn) {
                closeLongBtn.addEventListener('click', () => {
                    const firstLongIdx = openPositions.findIndex(pos => pos.type === 'long');
                    if (firstLongIdx !== -1) {
                        const pos = openPositions[firstLongIdx];
                        // Close logic: add to history, update balance, remove annotation
                        tradeHistory.push({
                            ...pos,
                            closedPrice: lastPrice,
                            closedPnl: pos.pnl,
                            closedAt: new Date().getTime(),
                            reason: 'Closed (mobile)'
                        });
                        account.balance += pos.margin + pos.pnl;
                        window.lastClosedPl = pos.pnl;
                        delete tradingChart.options.plugins.annotation.annotations[pos.id];
                        delete tradingChart.options.plugins.annotation.annotations[pos.id + '_liq'];
                        document.getElementById(pos.id)?.remove();
                        openPositions.splice(firstLongIdx, 1);
                        showMessage(`Closed LONG @ ${lastPrice.toFixed(2)}. P/L: $${pos.pnl.toFixed(2)}`);
                        uiNeedsUpdate = true;
                    } else {
                        showMessage('No open LONG positions to close.', 'error');
                    }
                });
            }
            if (closeShortBtn) {
                closeShortBtn.addEventListener('click', () => {
                    const firstShortIdx = openPositions.findIndex(pos => pos.type === 'short');
                    if (firstShortIdx !== -1) {
                        const pos = openPositions[firstShortIdx];
                        tradeHistory.push({
                            ...pos,
                            closedPrice: lastPrice,
                            closedPnl: pos.pnl,
                            closedAt: new Date().getTime(),
                            reason: 'Closed (mobile)'
                        });
                        account.balance += pos.margin + pos.pnl;
                        window.lastClosedPl = pos.pnl;
                        delete tradingChart.options.plugins.annotation.annotations[pos.id];
                        delete tradingChart.options.plugins.annotation.annotations[pos.id + '_liq'];
                        document.getElementById(pos.id)?.remove();
                        openPositions.splice(firstShortIdx, 1);
                        showMessage(`Closed SHORT @ ${lastPrice.toFixed(2)}. P/L: $${pos.pnl.toFixed(2)}`);
                        uiNeedsUpdate = true;
                    } else {
                        showMessage('No open SHORT positions to close.', 'error');
                    }
                });
            }
            leverageSlider.addEventListener('input', (e) => { leverageValueEl.textContent = `${e.target.value}x`; });
            speedSlider.addEventListener('input', (e) => {
                let speed = parseInt(e.target.value, 10);
                if (speed > 10) speed = 10;
                speedSlider.value = speed;
                speedValueEl.textContent = `${speed}x`;
                setGameSpeed(speed);
            });
            resetViewBtn.addEventListener('click', () => {
                visibleCandleCount = DEFAULT_VISIBLE_CANDLES; 
                uiNeedsUpdate = true;
            });
            document.getElementById('plus-btn').addEventListener('click', () => {
                visibleCandleCount = Math.max(MIN_VISIBLE_CANDLES, visibleCandleCount - 10);
                uiNeedsUpdate = true;
            });
            document.getElementById('minus-btn').addEventListener('click', () => {
                visibleCandleCount = Math.min(masterOneMinuteData.length, visibleCandleCount + 10);
                uiNeedsUpdate = true;
            });
            // Timeframe is now managed by button clicks above
            sizePercentageButtonsEl.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON' && e.target.dataset.percent) {
                    const btn = e.target;
                    const isActive = btn.classList.contains('bg-indigo-600');
                    if (isActive) {
                        // Deselect if already active
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
                        tradeSizeInput.value = '';
                    } else {
                        // Select this button, deselect others
                        Array.from(sizePercentageButtonsEl.children).forEach(b => {
                            if (b === btn) {
                                b.classList.add('bg-indigo-600', 'text-white');
                                b.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                            } else {
                                b.classList.remove('bg-indigo-600', 'text-white');
                                b.classList.add('bg-gray-700', 'hover:bg-gray-600');
                            }
                        });
                        updateTradeSizeFromPercent();
                    }
                }
            });

            longButton.addEventListener('click', () => placeTrade('long'));
            shortButton.addEventListener('click', () => placeTrade('short'));

            // --- Utility Functions (unchanged, collapsed for brevity) ---
            function toHeikinAshi(data) { if (data.length < 1) return []; const haData = []; let prevHaOpen = data[0].o; let prevHaClose = data[0].c; for (let i = 0; i < data.length; i++) { const curr = data[i]; const haClose = (curr.o + curr.h + curr.l + curr.c) / 4; const haOpen = (prevHaOpen + prevHaClose) / 2; const haHigh = Math.max(curr.h, haOpen, haClose); const haLow = Math.min(curr.l, haOpen, haClose); haData.push({ x: curr.x, o: haOpen, h: haHigh, l: haLow, c: haClose }); prevHaOpen = haOpen; prevHaClose = haClose; } return haData; }
            function placeTrade(type) {
                const size = parseFloat(tradeSizeInput.value);
                if (isNaN(size) || size <= 0) {
                    showMessage("Please enter a valid trade size.", "error");
                    return;
                }
                // Allow trade if size is less than or equal to balance, with floating point tolerance
                if (Math.round(size * 100) > Math.round(account.balance * 100)) {
                    showMessage("Trade size cannot exceed your balance.", "error");
                    return;
                }
                account.balance -= size; // Deduct margin from balance
                // End game check will now be handled in game loop after trades are closed
        // End Game Modal logic
        function showEndGame() {
            // Gather stats
            const totalTrades = tradeHistory.length;
            const totalLongs = tradeHistory.filter(t => t.type === 'long').length;
            const totalShorts = tradeHistory.filter(t => t.type === 'short').length;
            const totalPL = tradeHistory.reduce((sum, t) => sum + (t.closedPnl || 0), 0);
            const maxBalance = Math.max(...tradeHistory.map(t => t.balance || 10000), 10000);
            const statsHtml = `
                <div class='mb-2'>Final Balance: <span class='text-red-400 font-bold'>$0.00</span></div>
                <div>Total Trades: <span class='font-bold'>${totalTrades}</span></div>
                <div>Longs: <span class='text-green-400 font-bold'>${totalLongs}</span> | Shorts: <span class='text-red-400 font-bold'>${totalShorts}</span></div>
                <div>Total P/L: <span class='font-bold ${totalPL >= 0 ? 'text-green-400' : 'text-red-400'}'>$${totalPL.toFixed(2)}</span></div>
            `;
            document.getElementById('endgame-stats').innerHTML = statsHtml;
            document.getElementById('endgame-modal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            // Freeze the game by stopping the game loop
            if (gameLoopInterval) clearInterval(gameLoopInterval);
        }
        document.getElementById('play-again-btn').onclick = function() {
            // Set 1h timeframe button as default
            currentTimeframe = 60;
            setActiveTimeframeButton(currentTimeframe);
            // Set 25% margin button as default
            const sizeButtons = document.querySelectorAll('#size-percentage-buttons button');
            if (sizeButtons.length > 0) {
                sizeButtons.forEach((btn, i) => {
                    if (i === 0) {
                        btn.classList.add('bg-indigo-600', 'text-white');
                        btn.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                    } else {
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-gray-700', 'hover:bg-gray-600');
                    }
                });
                // Update trade size input to 25%
                const tradeSizeInput = document.getElementById('trade-size');
                if (tradeSizeInput) tradeSizeInput.value = (account.balance * 0.25).toFixed(2);
            }
            // Reset leverage slider to far left (1x)
            const leverageSlider = document.getElementById('leverage');
            const leverageValueEl = document.getElementById('leverage-value');
            if (leverageSlider) leverageSlider.value = 1;
            if (leverageValueEl) leverageValueEl.textContent = '1x';
            // Reset game state
            account = { balance: 10000, equity: 10000 };
            openPositions = [];
            tradeHistory = [];
            masterOneMinuteData = [];
            lastPrice = 50000;
            lastTime = new Date().getTime();
            regenerateMasterData();
            createChart();
            uiNeedsUpdate = true;
            // Reset game speed slider to far left (1x)
            const speedSlider = document.getElementById('speed-slider');
            const speedValueEl = document.getElementById('speed-value');
            if (speedSlider) speedSlider.value = 1;
            if (speedValueEl) speedValueEl.textContent = '1x';
            // Resume the game loop
            setGameSpeed(1);
            document.getElementById('endgame-modal').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
                window.gameOver = false;
        };
                const position = {
                    id: `pos-${Date.now()}`,
                    type,
                    margin: size,
                    leverage: parseInt(leverageSlider.value),
                    entryPrice: lastPrice,
                    pnl: 0,
                };
                // Add entry price annotation
                const annotation = {
                    type: 'line',
                    yMin: position.entryPrice,
                    yMax: position.entryPrice,
                    borderColor: type === 'long' ? '#26A69A' : '#EF5350',
                    borderWidth: 2,
                    borderDash: [6, 6],
                    label: {
                        content: `${type.toUpperCase()} @ ${position.entryPrice.toFixed(2)}`,
                        enabled: true,
                        position: 'end',
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    }
                };
                tradingChart.options.plugins.annotation.annotations[position.id] = annotation;

                // Calculate liquidation price (simple cross margin formula)
                // For long: entryPrice - (entryPrice / leverage)
                // For short: entryPrice + (entryPrice / leverage)
                let liquidationPrice;
                if (type === 'long') {
                    liquidationPrice = position.entryPrice - (position.entryPrice / position.leverage);
                } else {
                    liquidationPrice = position.entryPrice + (position.entryPrice / position.leverage);
                }
                // Add amber dashed liquidation line annotation
                tradingChart.options.plugins.annotation.annotations[position.id + '_liq'] = {
                    type: 'line',
                    yMin: liquidationPrice,
                    yMax: liquidationPrice,
                    borderColor: '#FFC107', // amber
                    borderWidth: 1,
                    borderDash: [4, 4],
                    borderOpacity: 0.85,
                    label: {
                        content: `LIQUIDATION @ ${liquidationPrice.toFixed(2)}`,
                        enabled: true,
                        position: 'end',
                        color: '#FFC107',
                        backgroundColor: 'rgba(0,0,0,0.6)'
                    },
                    z: 9999
                };

                openPositions.push(position);
                uiNeedsUpdate = true;
            }
            function closePosition(id) {
                const positionIndex = openPositions.findIndex(p => p.id === id);
                if (positionIndex > -1) {
                    const position = openPositions[positionIndex];
                    account.balance += position.margin; // Return margin to balance
                    account.balance += position.pnl; // Add PnL
                    window.lastClosedPl = position.pnl; // Track last closed P/L
                    // Add to trade history
                    tradeHistory.push({
                        ...position,
                        closedPrice: lastPrice,
                        closedPnl: position.pnl,
                        closedAt: new Date().getTime(),
                        reason: 'Closed'
                    });
                    delete tradingChart.options.plugins.annotation.annotations[id];
                    delete tradingChart.options.plugins.annotation.annotations[id + '_liq'];
                    document.getElementById(id)?.remove();
                    openPositions.splice(positionIndex, 1);
                    uiNeedsUpdate = true;
                }
            }
            function updatePositionsList() { noPositionsMsgEl.style.display = openPositions.length === 0 ? 'block' : 'none'; openPositions.forEach(pos => { let posEl = document.getElementById(pos.id); if (!posEl) { posEl = document.createElement('div'); posEl.id = pos.id; posEl.innerHTML = `<span class="font-bold"></span><span></span><span></span><span></span><button class="close-pos-btn bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded">Close</button>`; positionsListEl.appendChild(posEl); posEl.querySelector('.close-pos-btn').addEventListener('click', () => closePosition(pos.id)); } const pnlColor = pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'; const bgColor = pos.pnl >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'; const typeColor = pos.type === 'long' ? 'text-green-400' : 'text-red-400'; posEl.className = `grid grid-cols-5 gap-2 items-center text-sm p-2 rounded-md ${bgColor}`; const fields = posEl.children; fields[0].className = `font-bold ${typeColor}`; fields[0].textContent = pos.type.toUpperCase(); fields[1].textContent = `$${pos.margin.toFixed(2)} (${pos.leverage}x)`; fields[2].textContent = pos.entryPrice.toFixed(2); fields[3].className = pnlColor; fields[3].textContent = pos.pnl.toFixed(2); }); }
            function updatePositionsList() {
                // Open positions
                noPositionsMsgEl.style.display = openPositions.length === 0 ? 'block' : 'none';
                function abbreviateNum(num) {
                    if (num >= 1e9) return (num/1e9).toFixed(2) + 'B';
                    if (num >= 1e6) return (num/1e6).toFixed(2) + 'M';
                    if (num >= 1e3) return (num/1e3).toFixed(2) + 'K';
                    return num.toFixed(2);
                }
                const isMobile = window.innerWidth <= 640;
                openPositions.forEach(pos => {
                    let posEl = document.getElementById(pos.id);
                    if (!posEl) {
                        posEl = document.createElement('div');
                        posEl.id = pos.id;
                        posEl.innerHTML = `<span class=\"font-bold\"></span><span></span><span></span><span></span><button class=\"close-pos-btn bg-gray-600 hover:bg-gray-500 text-white text-xs py-1 px-2 rounded\">Close</button>`;
                        positionsListEl.appendChild(posEl);
                        posEl.querySelector('.close-pos-btn').addEventListener('click', () => closePosition(pos.id));
                    }
                    const pnlColor = pos.pnl >= 0 ? 'text-green-400' : 'text-red-400';
                    const bgColor = pos.pnl >= 0 ? 'bg-green-900/30' : 'bg-red-900/30';
                    const typeColor = pos.type === 'long' ? 'text-green-400' : 'text-red-400';
                    posEl.className = `grid grid-cols-5 gap-2 items-center text-sm p-2 rounded-md ${bgColor}`;
                    const fields = posEl.children;
                    fields[0].className = `font-bold ${typeColor}`;
                    fields[0].textContent = pos.type.toUpperCase();
                    fields[1].textContent = isMobile ? `$${abbreviateNum(pos.margin)} (${pos.leverage}x)` : `$${pos.margin.toFixed(2)} (${pos.leverage}x)`;
                    if (isMobile) {
                        fields[2].innerHTML = `<span class='block text-xs text-gray-400'>Entry</span><span>${abbreviateNum(pos.entryPrice)}</span>`;
                    } else {
                        fields[2].textContent = pos.entryPrice.toFixed(2);
                    }
                    fields[3].className = pnlColor;
                    if (isMobile) {
                        fields[3].innerHTML = `<span class='block text-xs text-gray-400'>P/L</span><span>${abbreviateNum(pos.pnl)}</span>`;
                    } else {
                        fields[3].textContent = pos.pnl.toFixed(2);
                    }
                });
                // Trade history
                const historyListEl = document.getElementById('history-list');
                const noHistoryMsgEl = document.getElementById('no-history-msg');
                // Clear old history
                historyListEl.querySelectorAll('div').forEach(el => el.remove());
                noHistoryMsgEl.style.display = tradeHistory.length === 0 ? 'block' : 'none';
                tradeHistory.slice().reverse().forEach(trade => {
                    const pnlColor = trade.closedPnl >= 0 ? 'text-green-400' : 'text-red-400';
                    const bgColor = trade.closedPnl >= 0 ? 'bg-green-900/30' : 'bg-red-900/30';
                    const typeColor = trade.type === 'long' ? 'text-green-400' : 'text-red-400';
                    const tradeEl = document.createElement('div');
                    tradeEl.className = `grid grid-cols-6 gap-2 items-center text-sm p-2 rounded-md ${bgColor}`;
                    tradeEl.innerHTML = `
                        <span class=\"font-bold ${typeColor}\">${trade.type.toUpperCase()}</span>
                        <span>$${isMobile ? abbreviateNum(trade.margin) : trade.margin.toFixed(2)} (${trade.leverage}x)</span>
                        <span>${isMobile ? `<span class='block text-xs text-gray-400'>Entry</span><span>${abbreviateNum(trade.entryPrice)}</span>` : trade.entryPrice.toFixed(2)}</span>
                        <span>${isMobile ? `<span class='block text-xs text-gray-400'>Exit</span><span>${abbreviateNum(trade.closedPrice)}</span>` : trade.closedPrice.toFixed(2)}</span>
                        <span class=\"${pnlColor}\">${isMobile ? `<span class='block text-xs text-gray-400'>P/L</span><span>${abbreviateNum(trade.closedPnl)}</span>` : trade.closedPnl.toFixed(2)}</span>
                        <span class=\"text-xs text-gray-400\">${trade.reason}</span>
                    `;
                    historyListEl.appendChild(tradeEl);
                });
            }
            // Tab switching logic
            const openTabBtn = document.getElementById('open-tab-btn');
            const historyTabBtn = document.getElementById('history-tab-btn');
            const historyListEl = document.getElementById('history-list');
            function setActiveTab(tab) {
                if (tab === 'open') {
                    openTabBtn.classList.add('border-indigo-500');
                    openTabBtn.classList.remove('border-transparent');
                    historyTabBtn.classList.remove('border-indigo-500');
                    historyTabBtn.classList.add('border-transparent');
                    positionsListEl.classList.remove('hidden');
                    historyListEl.classList.add('hidden');
                } else {
                    historyTabBtn.classList.add('border-indigo-500');
                    historyTabBtn.classList.remove('border-transparent');
                    openTabBtn.classList.remove('border-indigo-500');
                    openTabBtn.classList.add('border-transparent');
                    positionsListEl.classList.add('hidden');
                    historyListEl.classList.remove('hidden');
                }
            }
            openTabBtn.addEventListener('click', () => setActiveTab('open'));
            historyTabBtn.addEventListener('click', () => setActiveTab('history'));
            // Set default tab on load
            setActiveTab('open');
            function setGameSpeed(speed) {
                speed = Math.min(10, speed);
                if (gameLoopInterval) clearInterval(gameLoopInterval);
                const intervalTime = Math.max(1, 1000 / speed);
                gameLoopInterval = setInterval(gameLoop, intervalTime);
            }
            let messageTimeout; function showMessage(text, type = "info", duration = 3000) { const messageBox = document.getElementById('message-box'); const messageText = document.getElementById('message-text'); if (messageTimeout) clearTimeout(messageTimeout); messageBox.style.backgroundColor = type === 'error' ? '#dc2626' : '#4f46e5'; messageText.textContent = text; messageBox.classList.remove('opacity-0', 'pointer-events-none'); messageTimeout = setTimeout(() => { messageBox.classList.add('opacity-0'); setTimeout(() => messageBox.classList.add('pointer-events-none'), 300); }, duration); }

            init();
        });

        // Abbreviate balance helper (moved outside renderLoop)
function abbreviateBalance(balance) {
    if (balance >= 1e6) return `$${(balance/1e6).toFixed(2)}M`;
    if (balance >= 1e3) return `$${(balance/1e3).toFixed(2)}k`;
    return `$${balance.toFixed(2)}`;
}
