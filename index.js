let baseUrl = "http://localhost:3000/items";

    function createItem() {
      const name = document.getElementById('createItem').value;
      const price = parseFloat(document.getElementById('createPrice').value);

      fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      })
      .then(res => res.json())
      .then(item => {
        console.log("Created:", item);
        localStorage.setItem('ItemName', JSON.stringify(item));
        alert('Item created successfully');
      })
      .catch(error => {
        console.error("Error creating item:", error);
        alert('Failed to create item');
      });
    }

    function getItems() {
      fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Items:', data);
        localStorage.setItem('allitems', JSON.stringify(data));
        alert("Data fetched successfully");

        const list = document.getElementById('itemsList');
        list.innerHTML = '';

        data.forEach(item => {
          const row = document.createElement('tr');

          const idCell = document.createElement('td');
          idCell.textContent = item.id;
          row.appendChild(idCell);

          const nameCell = document.createElement('td');
          nameCell.textContent = item.name;
          row.appendChild(nameCell);

          const priceCell = document.createElement('td');
          priceCell.textContent = `$${item.price.toFixed(2)}`;
          row.appendChild(priceCell);

          list.appendChild(row);
        });
      })
      .catch(error => {
        console.error("Error fetching items:", error);
        alert("Failed to fetch items");
      });
    }

    function updateItem() {
      const id = document.getElementById("updateItemId").value;
      const name = document.getElementById("itemName").value;
      const price = parseFloat(document.getElementById("itemPrice").value);

      fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      })
      .then(res => res.json())
      .then(item => {
        console.log('Updated:', item);
        localStorage.setItem(`item_${id}`, JSON.stringify(item));
        alert("Item updated successfully");
      })
      .catch(error => {
        console.error("Error updating item:", error);
        alert("Failed to update item");
      });
    }

    function deleteItem() {
      const id = document.getElementById("deleteItemId").value;
      console.log("Deleting item with ID:", id);

      fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        localStorage.removeItem(`item_${id}`);
        alert("Item deleted successfully");
      })
      .catch(error => {
        console.error("Error deleting item:", error);
        alert("Failed to delete item");
      });
    }