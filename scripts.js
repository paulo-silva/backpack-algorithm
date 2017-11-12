var produtos = [];
document.addEventListener('DOMContentLoaded', function() {

	const newProduct = document.getElementById('newProduct');
	const productsList = document.getElementById('productsList');
	const executeCalc = document.getElementById('executeCalc');
	const backpackCapacity = document.getElementById('backpackCapacity');

	backpackCapacity.focus();

	executeCalc.addEventListener('click', function() {
		produtos = [];
		produtosCadastrados = document.querySelectorAll('.product-name__wrapper');
		if (!!produtosCadastrados.length && !!backpackCapacity.value.length) {
			preencherProdutos( produtosCadastrados );
			produtos.sort(function(a, b) {
		    return a['peso'] - b['peso'];
			});
			const backPack = new BackPack(produtos, backpackCapacity.value);
			backPack.calc();
			mostrarResultado(backPack.pegarValorTotal(), backPack.pegarProdutosComprados());
		} else {
			alert('Verifique se você cadastrou ao menos um produto e definiu a capacidade da mochila!');
		}
	});

	function mostrarResultado (valorTotal, produtos) {
		produtosHtml = '';
		produtos.forEach(produto => {
			produtosHtml += `<p>${produto['nome']} - R$ ${parseFloat(produto['valor']).toFixed(2)} - ${parseFloat(produto['peso']).toFixed(2)} kg</p>`;
		});
		document.getElementById('buyedProducts').innerHTML = produtosHtml;
		document.getElementById('totalPriceValue').innerText = parseFloat(valorTotal).toFixed(2);
	}

	function preencherProdutos (elementos) {
		let nomeProduto = ''
			, valorProduto = 0
			, pesoProduto = 0
		;

		elementos.forEach(elemento => {
			nomeProduto = elemento.children[0].dataset.value.toUpperCase();
			valorProduto = parseFloat( elemento.children[1].dataset.value );
			pesoProduto = parseFloat( elemento.children[2].dataset.value );
			produtos.push({
				nome: nomeProduto,
				valor: valorProduto,
				peso: pesoProduto
			});

		});
	}

	newProduct.addEventListener('click', function(e) {
		e.preventDefault();
		let allFilled = true;
		let newProductInputs = document.getElementsByClassName('new-product__input');
		[].forEach.call(newProductInputs, function (el) {
			allFilled &= el.value.length > 0;
		});

		const productName = document.getElementById('productName').value.toUpperCase();
		const productValue = document.getElementById('productValue').value;
		const productWeight = document.getElementById('productWeight').value;

		[].forEach.call(newProductInputs, function (el) {
			el.value = '';
		});
		newProductInputs[0].focus();

		if (allFilled) {
			productsList.insertAdjacentHTML( 'beforeend', newProductWrapper(productName, productValue, productWeight) );
			[].forEach.call(document.getElementsByClassName('remove-product'), function (el) {
				el.addEventListener('click', function () {
					this.parentNode.remove();
				})
			});
		} else {
			alert('Ops, parece que você esqueceu de preencher todas as informações!');
		}

	});

	/**
	* Cria um novo elemento que guarda informações de um produto
	*/
	function newProductWrapper(productName, productValue, productWeight) {
		productValue = parseFloat( productValue.replace(',', '.') );
		productWeight = parseFloat( productWeight.replace(',', '.') );

		return `
			<div class="product">
				<p class="product-name__wrapper">
					<span class="product-name" data-value="${productName}">${productName}</span> -
					R$ <span class="product-value" data-value="${productValue}">${productValue.toFixed(2)}</span> - 
					<span class="product-weight" data-value="${productWeight}">${productWeight.toFixed(2)}</span> kg
				</p>
				<a href="#" class="remove-product" data-produtos-index="${produtos.length - 1}">X</a>
			</div>
		`;
	}

});