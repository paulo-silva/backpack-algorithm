class BackPack {

	constructor ( produtos, capacidadeMochila ) {
		this.produtos = produtos;
		this.capacidadeMochila = parseInt(capacidadeMochila);
		this.matriz = [];
	}

	montarMatriz () {
		let totalColunas = this.capacidadeMochila + 1;

		[].forEach.call(this.produtos, (produto, idx) => {
			if (idx === 0) this.matriz.push( Array( totalColunas ).fill( 0 ) );

			this.matriz.push( Array( totalColunas ).fill( null ) );
			this.matriz[this.matriz.length - 1][0] = 0;
		});
	}

	preencherMatriz () {

		// Declaração de variáveis
		let totalLinhas = this.matriz.length
			, totalColunas = this.capacidadeMochila + 1
			, i, j, produto
		;

		// Loop nas linhas das matrizes
		for (i = 1; i < totalLinhas; i++) {

			produto = this.produtos[i - 1];

			// Loop nas colunas de cada linha
			for (j = 1; j < totalColunas; j++) {
				if ( produto['peso'] > j ) {
					if ( this.matriz[i - 1][j] > 0 ) {
						this.matriz[i][j] = this.matriz[i - 1][j];
					} else {
						this.matriz[i][j] = 0;
					}
				} else {
					this.matriz[i][j] = produto['valor'] + ( this.matriz[i - 1][j - produto['peso']] );
				}
			}
		}
	}

	calc () {
		this.montarMatriz();
		this.preencherMatriz();
		console.log(this.matriz);
		console.log(this.pegarValorTotal());
		console.log(this.pegarProdutosComprados());
	}

	pegarValorTotal () {
		return this.matriz[ this.produtos.length ][ this.capacidadeMochila ];
	}

	pegarProdutosComprados () {
		let produtosLevados = []
			, j = this.capacidadeMochila
			, i = this.produtos.length
		;

		// Loop nas linhas das matrizes, de baixo para cima
		for (i; i > 0; i--) {

			// Loop nas colunas de cada linha, da última à primeira
			for (j; j > 0; j--) {
				if ( this.matriz[i - 1][j] !== this.matriz[i][j] ) {
					produtosLevados.push( this.produtos[i - 1] );
					j -= this.produtos[i - 1]['peso'];
					break;
				}
			}
		}
		return produtosLevados;
	}
}