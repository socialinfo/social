<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link href="<%=basePath%>/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="<%=basePath%>/css/diffusion.css" rel="stylesheet">

<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/js/d3.min.js"></script>
<script src="<%=basePath%>/js/epidemic/diffusion.js"></script>
<script src="<%=basePath%>/js/epidemic/base.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>
</head>
<body>
		<div class='container'>
			<div class='row'>
			<div class='col-lg-3'>
				<!--lay the control panel -->
				<div>
					<h2>json file</h2>
					<input type="file" id="exampleInputFile" />
					<button type="button" id='startSimulation' class="btn btn-primary btn-lg btn-block">START</button>
				</div>
				<!--lay the dynamic simulation panel -->
				<div id='simulationPanel'>

				</div>
			</div>

			<div class='col-lg-9' id='main'>

			</div>
			</div>
		</div>
	</body>
</html>