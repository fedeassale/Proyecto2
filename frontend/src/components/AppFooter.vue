<template>   
	<footer class="footer">
		<div class="footer-content">
			<div class="footer-section">
				<h3>Mi Aplicación</h3>
				<p>Tu plataforma favorita para gestionar artistas, álbumes y canciones.</p>
			</div>
			<div class="footer-section">
				<h3>Enlaces</h3>
				<ul>
					<li><a href="/">Inicio</a></li>
					<li><a href="#">Sobre Nosotros</a></li>
					<li><a href="#">Contacto</a></li>
				</ul>
			</div>
			<div class="footer-section">
				<h3>Síguenos</h3>
				<div class="social-icons">
					<i class="pi pi-facebook"></i>
					<i class="pi pi-twitter"></i>
					<i class="pi pi-instagram"></i>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2025 Mi Aplicación. Todos los derechos reservados.</p>
		</div>
	</footer>
</template>
<script></script>
<style scoped>
.footer {
	background-color: #2c3e50;
	color: white;
	padding: 2rem 0;
	text-align: center;
	margin-top: 10px;
}
.footer-content {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 1rem 0;
}
.footer-section {
  	max-width: 250px;
}
.footer-section h3 {
	font-size: 1.2rem;
	margin-bottom: 1rem;
}
.footer-section ul {
	list-style: none;
	padding: 0;
}
.footer-section ul li {
  	margin: 0.5rem 0;
}
.footer-section ul li a {
	color: white;
	text-decoration: none;
	transition: color 0.3s;
}
.footer-section ul li a:hover {
  	color: #f39c12;
}
.social-icons {
	display: flex;
	justify-content: center;
	gap: 1rem;
	font-size: 1.5rem;
}
.social-icons i {
	cursor: pointer;
	transition: transform 0.3s, color 0.3s;
}
.social-icons i:hover {
	transform: scale(1.2);
	color: #f39c12;
}
.footer-bottom {
	background-color: #1a252f;
	padding: 1rem;
	margin-top: 1rem;
}
</style>