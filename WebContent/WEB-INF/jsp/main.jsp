<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" errorPage="/error/error.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Information diffusion</title>
<link href="<%=basePath%>/bootstrap/css/bootstrap.css" rel="stylesheet">
<script src="<%=basePath%>/js/jquery/jquery-1.11.1.min.js"></script>
<script src="<%=basePath%>/bootstrap/js/bootstrap.js"></script>

<script type="text/javascript">
	function changeContent(destPage) {
		$("#contentframe").attr("src", destPage);
	};

	function changePage(page, currentId, isAppendBread, appendValue) {
		$(".active").removeClass("active");
		$("#" + currentId).addClass("active");
		changeContent("pageDispatch.do?page=" + page);

		if (isAppendBread) {
			$("#breadCrumb .active").removeClass('active');
		} else {
			$("#breadCrumb").empty();
		}
		$("#breadCrumb").append(appendValue);
	};
</script>

</head>
<body style="padding-top: 50px">
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="navbar-header">
		<a class="navbar-brand" href="#">信息传播</a>
	</div>
	<div>
		<ul class="nav navbar-nav">
			<li id="homeli" class="active"><a title="Home Page" href="#" onclick='changePage("home","homeli",false,"<li class=active><a>Home</a></li>");'>主页</a></li>
			<li id="herdli"><a title="Data Definition Language" href="#" onclick='changePage("herd/main","herdli",false,"<li><a>Home</a></li><li class=active><a>Herd</a></li>");'>羊群效应</a></li>
			<li id="casli"><a title="Data Definition Language" href="#" onclick='changePage("cascade/main","casli",false,"<li><a>Home</a></li><li class=active><a>Cascade</a></li>");'>瀑布模型</a></li>
			<li id="innoli"><a title="Data Definition Language" href="#" onclick='changePage("innovation/main","innoli",false,"<li><a>Home</a></li><li class=active><a>Innovation</a></li>");'>创新传播</a></li>
			<li id="epili"><a title="Data Manipulation Language" href="#" onclick='changePage("epidemic/main","epili",false,"<li><a>Home</a></li><li class=active><a>Epidemic</a></li>");'>传染病模型</a></li>
		</ul>
	</div>
	</nav>

	<div style="width: 98%;margin:0 auto;">
		<div>
			<ol id="breadCrumb" class="breadcrumb">
				<li class="active"><a href="#">Home</a></li>
			</ol>
		</div>
		<div>
			<iframe id="contentframe"
				style="width: 100%; height: 1000px; border: 0px;" scrolling="no"></iframe>
		</div>
	</div>
	<script type="text/javascript" charset="utf-8">
		$(document).ready(function() {
			$("#contentframe").attr("src", "pageDispatch.do?page=home");	
		});
	</script>
</body>
</html>
