
const ShowSingleDataCard = document.getElementById('ShowSingleDataCard');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', () => {
    ShowSingleDataCard.classList.add('hidden');
});

async function showSingleData(id) {
    try {
        let response = await fetch(`/product/get-single/data/${id}`);
        let data = await response.json();

        if (data.message === "success") {

            modalBody.innerHTML = `
          <div>Product name : ${data.data.productName}</div>
          <div>Category : ${data.data.createdAt}</div>
          <div>Price : ${data.data.price}</div>
          <div>Description : ${data.data.productDetails}</div>
        `;

            ShowSingleDataCard.classList.remove('hidden');
            ShowSingleDataCard.classList.add('flex');
        }

    } catch (err) {
        console.log('Route is not working', err);
    }
}

async function DeleteItem(id) {
    try {
        let response = await fetch(`/product/delete/${id}`);
        let data = await response.json();

        if (data.message === "success") {
            document.getElementById(`row-${id}`).remove();
        }

    } catch (err) {
        console.log('Route is not working', err);
    }
}
