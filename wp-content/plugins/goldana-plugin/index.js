
async function startSession() {
  try {
    const response = await fetch(
      'https://api-capital.backend-capital.com/api/v1/session',
      {
        method: 'POST',
        headers: {
          'X-CAP-API-KEY': 'vQ5hjpmakUVD0N3N',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: 'dvlpr.saleh@gmail.com',
          password: 'Cc-0537221210',
        }),
      }
    );
    if (response.ok) console.log('session started');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const cst = response.headers.get('cst');
    const securityToken = response.headers.get('x-security-token');

    return { cst, securityToken };
  } catch (error) {
    console.error('Error starting session:', error);
    throw error;
  }
}
function e() {
    try {
        const updateProductPrices = () => {
            const elements = document.querySelectorAll('.wc-block-components-product-price:not([data-updated])');
            elements.forEach((element) => {
                element.innerHTML = `<p>يتم جلب السعر...</p>`;
                element.setAttribute('data-updated', 'true');
            });
        };

        updateProductPrices();

        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    updateProductPrices();
                }
            }
        });

        const productContainer = document.querySelector('.etheme-product-grid');
        if (productContainer) {
            observer.observe(productContainer, { childList: true });
        }
    } catch (error) {
        console.error('Error starting session:', error);
    }
}



/*------------------------------------------------------------------------------------------------------------------*/


function renderProductPrice(elements, livePrice_24, calculatedValue, color) {
  elements.forEach((element) => {
      
    const weight = parseFloat(element.getAttribute('data-product-weight')) || 1;
    const manufacturingFees = parseFloat(element.getAttribute('data-product-manufacturing-fees')) || 1;
    const goldCarat = parseInt(element.getAttribute('data-product-gold-carat')) ;

// console.log("Raw gold carat attribute:", element.getAttribute('data-product-gold-carat'));
// console.log("Element being processed:", element);
// console.log(goldCarat);
    
    switch (goldCarat) {
      case 18: {
        const livePrice_18 = livePrice_24 * 0.75;
        const value_18 = weight * (manufacturingFees + livePrice_18) * 1.15;
    
        // Adjusting calculatedValue based on the color
        calculatedValue = color === '#10B981' ? value_18 + 2 : value_18 - 2;
        break;
      }
    
      case 21: {
        const livePrice_21 = livePrice_24 * 0.875;
        const value_21 = weight * (manufacturingFees + livePrice_21) * 1.15;
    
        // Adjusting calculatedValue based on the color
        calculatedValue = color === '#10B981' ? value_21 + 2 : value_21 - 2;
        break;
      }
    
      case 24: {
        calculatedValue = livePrice_24 * weight;
        break;
      }
    
      default:
      calculatedValue = 'بيانات ناقصه';
        // console.warn('Invalid gold carat value:', goldCarat);
        break;
    }
    


    const displayValue =
      typeof calculatedValue === 'number'
        ? calculatedValue.toFixed(2) // Format the value to 2 decimal places
        : calculatedValue; // Use the string as-is if it's not a number

    // Insert the calculated value into the HTML and apply the dynamic color
    element.innerHTML = `
             <style>
                /* Container for price and indicator */
                .price-indicator {
                    display: flex;
                    align-items: center;
                    font-family: 'Arial', sans-serif;
                    font-size: 1.3rem;
                
                    // justify-content: start;
                }

                /* Price text */
                .pricee {
                    font-weight: bold !important;
                      font-size: 1.25rem; !important;
                    margin: 0px !important;
                  color: ${color} !important;
                }

          
                .arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1rem;
                    transition: transform 0.3s ease, color 0.3s ease;
                }

            
                .up {
                    color: #10b981; 
                }

                .down {
                    color: #ef4444; 
                }

              .curencyy{
                margin-right: 4px;
                font-size : 1.2rem
              }

            
            </style>
            
            <div class="price-indicator">
             <span class="arrow" id="arrow">-</span>
                <span class="pricee">${displayValue}</span>
               <span class="curencyy" id="curency">ر.س</span>
            </div>
          `;

    const arrowElement = element.querySelector('#arrow');

    if (color === '#10B981') {
      arrowElement.innerHTML = '▲';
      arrowElement.classList.remove('down');
      arrowElement.classList.add('up');
    } else if (color === '#F43F5E') {
      arrowElement.innerHTML = '▼';
      arrowElement.classList.remove('up');
      arrowElement.classList.add('down');
    } else {
      arrowElement.innerHTML = '-';
      arrowElement.classList.remove('up', 'down');
    }
  });
}



/*-------------------------------------------------------------------------------------------------------------------*/


async function initiateWebSocketConnection() {
  try {
    let cst = localStorage.getItem('CST');
    let securityToken = localStorage.getItem('TOKEN');
    
     if (!cst || !securityToken) {
        console.log('start new Session ...');
        const sessionData = await startSession();
        cst = sessionData.cst;
        securityToken = sessionData.securityToken;
        localStorage.setItem('CST', cst);
        localStorage.setItem('TOKEN', securityToken);
    }
    // sendTokensToBackend();

    const ws = new WebSocket(
      'wss://api-streaming-capital.backend-capital.com/connect'
    );
    
  ws.onopen =  () => {
    if (!localStorage.getItem('CST') || !localStorage.getItem('TOKEN')) {
        console.log('no CST and TOKEN start new Session from onOpen ...');
        // const sessionData = await startSession(); 
        // cst = sessionData.cst;
        // securityToken = sessionData.securityToken;
        // localStorage.setItem('CST', cst);
        // localStorage.setItem('TOKEN', securityToken);
    }
    else {
         console.log('CST & TOKEN is in storge');
   
    
    const subscriptionMessage = {
        destination: 'marketData.subscribe',
        correlationId: '100',
        cst,
        securityToken,
        payload: { epics: ['GOLD'] },
    };
    ws.send(JSON.stringify(subscriptionMessage));
    console.log('WebSocket connection opened');
    }
};


    let prev = 0;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'OK') {
          const livePrice_24 = ( data.payload.bid * 121 ) / 1000;
            
   
          console.log('WebSocket message received:', livePrice_24);
          
          let calculatedValue = 1;
          const difference = livePrice_24 - (this.prev + 0.001);
          let color = difference < 0 ? '#F43F5E' : '#10B981';
          this.prev = livePrice_24;

          const elements = document.querySelectorAll('#livePriceEl');
          renderProductPrice(elements, livePrice_24, calculatedValue, color);

       
        } else if (data.payload.errorCode === 'error.invalid.session.token') {
          localStorage.removeItem('CST');
          localStorage.removeItem('TOKEN');
        }
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
         localStorage.removeItem('CST');
      localStorage.removeItem('TOKEN');
      console.log('WebSocket connection closed');
    };

    // setTimeout(() => {
        // ping();
    //   ws.close();
    //   localStorage.removeItem('CST');
    //   localStorage.removeItem('TOKEN');
    //   initiateWebSocketConnection();
    // },  10000); // Reconnect after 10 minutes 9 * 60 *
  } catch (error) {
    console.error(
      'Failed to start session or establish WebSocket connection:',
      error
    );
  }
}

// let ws; // تعريف WebSocket كمتغير عام

// async function verifySession(cst, token) {
//   // التحقق من صحة الجلسة
//   try {
//     const response = await fetch('https://api.example.com/verify-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'CST': cst,
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     return response.ok; // الجلسة صالحة إذا كانت الاستجابة ناجحة
//   } catch (error) {
//     console.error('Error verifying session:', error);
//     return false;
//   }
// }


// async function initiateWebSocketConnection() {
//   try {
//     // أغلق أي اتصال WebSocket موجود
//     if (ws && ws.readyState !== WebSocket.CLOSED) {
//       console.log('Closing existing WebSocket connection...');
//       ws.close();
//     }

//     let cst = localStorage.getItem('CST');
//     let token = localStorage.getItem('TOKEN');

//     if (!cst || !token ) {
//     // if (!cst || !token || !(await verifySession(cst, token))) {
//       console.log('Session no in storage, starting a new session...');
//       const sessionData = await startSession();
//       cst = sessionData.cst;
//       token = sessionData.securityToken;
//       localStorage.setItem('CST', cst);
//       localStorage.setItem('TOKEN', token);
//     }

//     // إنشاء اتصال WebSocket جديد
//     ws = new WebSocket('wss://api-streaming-capital.backend-capital.com/connect');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//       if (ws.readyState === WebSocket.OPEN) {
//         const subscriptionMessage = {
//           destination: 'marketData.subscribe',
//           correlationId: '100',
//           cst,
//           securityToken: token,
//           payload: { epics: ['GOLD'] },
//         };
//         ws.send(JSON.stringify(subscriptionMessage));
//         console.log('Subscription message sent');
//       }
//     };

//     ws.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);

//         if (data.status === 'OK') {
//                  const livePrice_24 = ( data.payload.bid * 121.5 ) / 1000;
//           console.log('WebSocket message received:', livePrice_24);

//           let calculatedValue = 0;
//           const difference = livePrice_24 - (this.prev || 0);
//           const color = difference < 0 ? '#F43F5E' : '#10B981';
//           this.prev = livePrice_24;

//           const elements = document.querySelectorAll('#livePriceEl');
//           renderProductPrice(elements, livePrice_24, calculatedValue, color);
//         // } else if (data.payload.errorCode === 'error.invalid.session.token') {
//         //   console.log('Invalid session token, clearing localStorage...');
//         //   localStorage.removeItem('CST');
//         //   localStorage.removeItem('TOKEN');
//         }
//       }
//       catch (e) {
//         console.error('Error parsing WebSocket message:', e);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed, retrying in 5 seconds...');
//       setTimeout(() => {
//         initiateWebSocketConnection(); // إعادة محاولة الاتصال
//       }, 2000);
//     };

//     // إغلاق WebSocket عند مغادرة الصفحة
//     window.addEventListener('beforeunload', () => {
//       if (ws) {
//         console.log('Closing WebSocket due to page unload...');
//         ws.close();
//       }
//     });
//   } catch (error) {
//     console.error(
//       'Failed to start session or establish WebSocket connection:',
//       error
//     );
//   }
// }



/*-------------------------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const todayUTC = new Date();
  const dayOfWeekUTC = todayUTC.getUTCDay(); // Returns 0 (Sunday) to 6 (Saturday)

     e();
  if (dayOfWeekUTC !== 0 && dayOfWeekUTC !== 6) {
    // Day is not Sunday (0) or Saturday (6)
    initiateWebSocketConnection();
  } else {
    // fixedPrice();
    console.log('Today (UTC) is Saturday or Sunday. Function not executed.');
  }
});

document.addEventListener('etheme_product_grid_ajax_loaded', function() {
    console.log('1233333333333333333333333333333333333333333333333333');
});


// document.addEventListener('ajaxComplete', () => {
//     const elements = document.querySelectorAll('.wc-block-components-product-price');
//     elements.forEach((element) => {
//         element.innerHTML = `<p>يتم جلب السعر...</p>`;
//     });
// });












