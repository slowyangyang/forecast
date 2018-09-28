//$(function(){
//	1.获取当前城市的天气信息
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city",
		dataType:"jsonp",
		success:function(obj){
			tianqi = obj.data;
			updata(tianqi);
			console.log(tianqi)
		}
	})
	function updata(tianqi){
		//获取当前城市
			$(".city").html(tianqi.city);
		//获取当前城市的天气状况
			$(".pollu_p").html(tianqi.weather.quality_level);
		//获取当千温度
			$(".temp").html(tianqi.weather.current_temperature+'°');
		//当前的天气
			$("#weather").html(tianqi.weather.current_condition)
		//当前风向
			$(".star_dic").html(tianqi.weather.wind_direction);
		//今天的天气
			$(".day_temp").html(tianqi.weather.dat_high_temperature+'°');
			$("").html(tianqi.weather.dat_low_temperature);
			$(".tq_con").html(tianqi.weather.dat_condition);
			$(".tom_con").html(tianqi.weather.tomorrow_condition);
			$(".tom_temp").html(tianqi.weather.tomorrow_high_temperature+"°")
			$(".star_lev").html(tianqi.weather.wind_level+"级");
		//天气图标
			$(".tosun").css({"background":"url(img/"+tianqi.weather.dat_weather_icon_id+".png) no-repeat center"})
			$(".tmsun").css({"background":"url(img/"+tianqi.weather.tomorrow_weather_icon_id+".png) no-repeat center"})
		//未来24小时天气
			let hweather = tianqi.weather.hourly_forecast;
			hweather.forEach(function(v,i){
//				console.log(v);
//				let li = document.createElement("li");
//				let o = $(".dayblist").append(li);
//				$(".dayblist>li").append("<span>"+v.hour+"</span>");
//				$(".dayblist>li").append("<span>"+v.temperature+"</span>");
				let str = `	<li>
								<span>${v.hour+":00"}</span>
								<div class="sun" style="background:url(img/${v.weather_icon_id}.png) no-repeat center"></div>
								<p>${v.temperature+"°"}</p>
							</li>`;
				$(".dayblist").append(str);
			})
			
		//未来15天天气	
			let dweather = tianqi.weather.forecast_list;
//			console.log(dweather);
			dweather.forEach(function(v1){
				let str1 = `<li>
						<div class="yun">
							<div class="date">
								<span>${v1.date}</span>
							</div>
							<p>${v1.condition}</p>
						</div>
						<div class="sun" style="background:url(img/${v1.weather_icon_id}.png) no-repeat center"></div>
						<div class="du">
							<span>${v1.high_temperature}</span>
							<div class="dian"></div>
						</div>
						<div class="du">					
							<div class="dian lan"></div>
							<span>${v1.low_temperature}</span>
						</div>
						<div class="sun"></div>
						<div class="yun">
							<p>${v1.wind_direction}</p>
							<div class="date">
								<span>${v1.wind_direction}</span>
								<span>${v1.wind_level+"级"}</span>
							</div>					
						</div>
					</li>`;
				$(".everylist").append(str1);
			})			
	}
	
	
	//搜索栏的出现和消失
	$(".city").click(function(){
		console.log(1);
		$(".position").css({"display":"block"})
		$(".yy").css({"display":"none"})
	})
	$(".close").click(function(){
		$(".position").css({"display":"none"})
		$(".yy").css({"display":"block"})
	})
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city = obj.data;
		console.log(city)
			updataCity(city);
		}
	});
	//获取每个城市的信息
	function updataCity(city){
		//city是个对象，没有forEeach for方法
		for(let i in city){
			let str = `<li >${i}</li>`;
			$(".hotcitylist").append(str);
			for(let j in city[i]){
				let str1 = `<li>${j}</li>`
				 $(".hotcitylist").append(str1);
			}
		}
	}
	//点击每个城市，获取当前城市的天气信息
	window.onload=function(){
		$("li").click(function(){
			$(".position").css({"display":"none"})
			$(".yy").css({"display":"block"});	
			let con = $(this).html();
			ajaxs(con);
//			console.log(con)
			//添加到历史栏
			let str3 = `<li class="ou">${con}</li>`;
			$(".historylist").append(str3);
			//显示当前定位
//			let str4 = `<li class="ou">${con}</li>`;
			$(".citys").html(con);
		})
		//获取某个城市的天气信息
		function ajaxs(str){
			let url1 =`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}` 
			$.ajax({
				type:"get",
				url:url1,
				dataType:"jsonp",
				success:function(obj){
					let tianqi2 = obj.data;
					updata(tianqi2);
				}
			});
		}
	
		//在搜索框内输入内容，可以搜索当前城市的天气状况
			$(".ssk>input").focus(function(){
				$(".close>span").html("搜索");
			})
		//点击搜索时，获去input中的内容进行搜索	
			$(".close>span").click(function(){
				let text = $("input").val();
				for(let i in city){
					if(text==i){
						ajaxs(text)
						return;
					}
					for(let j in city[i]){
						if(text==j){
							ajaxs(text);
							return;
						}
				    }
				
				}
				if(text!==''){
					alert("没有该城市");
				}
			})
			$(".icon-lajilou").click(function(){
				$(".historylist li:last-child").remove();
			})
	}
//})
//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索