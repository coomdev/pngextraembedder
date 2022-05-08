var b4kFuuka = new function () {
	var _this = this;
	
	this.props = {};
	
	this.main = function () {
		for (var idx in _this.modules) {
			try {
				_this.modules[idx] = new _this.modules[idx];
			} catch (error) {
				console.error(error);
			}
		}
	};
	
	this.runOnAll = function (func) {
		func(document.body);
		
		document.addEventListener(
			"DOMNodeInserted",
			function (event) {
				if (
					event.target &&
					event.target.nodeType === Node.ELEMENT_NODE
				) {
					func(event.target);
				}
			}
		);
	};
	
	this.modules = {
		setRootClasses: function () {
			document.documentElement.classList.add("foolfuuka");
			document.documentElement.classList.add("javascript");
			document.documentElement.classList.add(navigator.userAgent.match(/Mobi/) ? "mobile" : "desktop");
		},
		
		setThisProps: function () {
			_this.props.vars = (window.backend_vars ? window.backend_vars : {});
			_this.props.asAdmin = (document.querySelector("a[href$=\"/admin/\"]") !== null);
			_this.props.isInBoard = (_this.props.vars.board_shortname != null);
			_this.props.isInThread = (_this.props.vars.thread_id != null);
			_this.props.isInSearch = (window.location.pathname.match(/^\/(.+?)\/search\//) !== null);
			_this.props.isInReport = (window.location.pathname.match(/^\/(.+?)\/reports\//) !== null);
			_this.props.isInPostView = (_this.props.isInBoard || _this.props.isInSearch || _this.props.isInReport);
			_this.props.boardNameShort = (_this.props.isInBoard ? _this.props.vars.board_shortname : null);
			_this.props.boardIsArchive = (_this.props.isInBoard ? (document.querySelector("input[name=\"file_image\"]") === null) : null);
			_this.props.curThreadNumber = (_this.props.isInThread ? parseInt(_this.props.vars.thread_id) : null);
		},
		
		setBodyAttribs: function () {
			if (_this.props.asAdmin) {
				document.body.classList.add("as-admin");
			}
			
			if (_this.props.isInBoard) {
				document.body.classList.add("is-board");
				document.body.classList.add(_this.props.boardIsArchive ? "is-board-archive" : "is-board-normal");
				document.body.classList.add("board-" + _this.props.boardNameShort);
			}
			
			if (_this.props.isInSearch) {
				document.body.classList.add("is-search");
			}
			
			if (_this.props.isInPostView) {
				document.body.classList.add("is-post-view");
			}
		},
		
		setPostDatasets: function () {
			_this.runOnAll(function (target) {
				target.querySelectorAll("article.thread, article.post")
					.forEach(
						function (post) {
							var postHeader;
							var postBoardShow;
							var postPosterName;
							var postPosterTrip;
							var postPosterLevel;
							
							if (
								_this.props.isInSearch &&
								post.classList.contains("thread")
							) {
								return;
							}
							
							post.dataset.board = _this.props.boardNameShort;
							post.dataset.number = post.id;
							
							if (post.parentElement.id === "backlink") {
								post.dataset.board = "";
							}
							
							postHeader = post.querySelector("header");
							
							if (postHeader) {
								postBoardShow = postHeader.querySelector(".post_show_board");
								
								if (postBoardShow && postBoardShow.textContent) {
									post.dataset.board = postBoardShow.textContent.replace(/\//g, "");
								}
								
								postPosterName = postHeader.querySelector(".post_author");
								postPosterTrip = postHeader.querySelector(".post_tripcode");
								postPosterLevel = postHeader.querySelector(".post_level");
								
								if (postPosterName && postPosterName.textContent) { post.dataset.posterName = postPosterName.textContent; }
								if (postPosterTrip && postPosterTrip.textContent) { post.dataset.posterTrip = postPosterTrip.textContent; }
								if (postPosterLevel && postPosterLevel.textContent) { post.dataset.posterLevel = postPosterLevel.className.match(/\bpost_level_(.+)\b/)[1]; }
							}
						}
					);
			});
		},
		
		stopFontBoosting: function () {
			if (navigator.userAgent.match(/Android/)) {
				document.documentElement.classList.add("disable-font-boosting");
			}
		},
		
		addThumbLazyLoad: function () {
			var options;
			
			options = {
				src: "data-src",
				srcset: "data-srcset",
				selector: "img.lazyload",
				root: null,
				rootMargin: "5000px",
				threshold: 0
			}
			
			if (_this.props.isInPostView) {
				_this.runOnAll(
					function (target) {
						window.lazyload(
							target.querySelectorAll("img.lazyload"),
							options
						);
					}
				);
			}
		},
		
		addPostIconText: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(
					function (target) {
						target.querySelectorAll(".post_type > i")
							.forEach(
								function (item) {
									var elem1;
									var elem2;
									var elem3;
									
									elem1 = document.createElement("span");
									elem1.title = item.title;
									
									elem2 = document.createElement("span");
									elem2.style.position = "relative";
									elem2.style.top = "-1px";
									elem2.style.marginLeft = "2px";
									elem2.style.fontSize = "0.8em";
									elem2.style.opacity = (document.body.classList.contains("midnight") ? "0.6" : null);
									
									elem2.textContent =
										(function () {
											switch (item.classList[0]) {
												case "icon-trash": return "Deleted";
												case "icon-eye-close": return "Spoiler";
												case "icon-pushpin": return "Sticky";
												case "icon-lock": return "Locked";
												case "icon-comment-alt": return "Ghost";
												default: return "???";
											}
										})();
									
									if (item.classList[0] === "icon-tag") {
										item.style.display = "none";
										return;
									}
									
									elem3 = item.cloneNode();
									elem3.removeAttribute("title");
									
									elem1.appendChild(elem3);
									elem1.appendChild(elem2);
									
									item.parentElement.replaceChild(elem1, item);
								}
							);
					}
				);
			}
		},
		
		setCapcodeColors: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(function (target) {
					var capcodeName;
					var capcodeColor;
					
					target.querySelectorAll(".post_poster_data .post_level")
						.forEach(
							function (capcode) {
								capcodeName = capcode.className.match(/\bpost_level_(.+)\b/)[1];
								capcodeColor = window.getComputedStyle(capcode).color;
								
								if (_this.props.isInBoard && !_this.props.boardIsArchive) {
									if (capcodeName === "administrator") capcodeColor = "#FF6C34";
								}
								
								if (document.body.classList.contains("midnight")) {
									if (capcodeName === "moderator") capcodeColor = "#B200B2";
									if (capcodeName === "developer") capcodeColor = "#0078FF";
								}
								
								capcode.parentElement.querySelectorAll("*")
									.forEach(
										function (item) {
											item.style.color = capcodeColor;
										}
									);
								
								if (_this.props.isInBoard) {
									capcode.title = ("This user is " + (_this.props.boardIsArchive ? "a 4chan" : "an arch.b4k.co") + " " + capcodeName.toLowerCase() + ".");
								}
							}
						);
				});
			}
		},
		
		setBannedMessages: function () {
			return; // current version of foolfuuka has this built in
			
			if (_this.props.isInPostView) {
				_this.runOnAll(function (target) {
					var match;
					var bannu;
					
					target.querySelectorAll("article .text")
						.forEach(
							function (comment) {
								comment.childNodes.forEach(
									function (node) {
										if (node.textContent.includes("[banned]")) {
											match = node.textContent.trim().match(/^\[banned\](.+)\[\/banned\]$/);
											
											if (match) {
												bannu = document.createElement("span");
												bannu.className = "banned";
												bannu.textContent = match[1];
												
												node.parentNode.replaceChild(bannu, node);
											}
										}
									}
								);
							}
						);
				});
			}
		},
		
		addReportFormNote: function () {
			if (_this.props.isInPostView) {
				window.setInterval(
					function () {
						var dialogOuter;
						var dialogInner;
						
						dialogOuter = document.querySelector("#post_tools_modal.in");
						
						if (
							dialogOuter && 
							dialogOuter.querySelector(".title").textContent.match(/^Report/)
						) {
							dialogInner = dialogOuter.querySelector(".model-note")
							
							if (
								dialogInner &&
								dialogInner.classList.contains("edited") == false
							) {
								if (_this.props.isInBoard && !_this.props.boardIsArchive) {
									dialogInner.innerHTML = "Posts should only be reported for reasons listed in the board rules.";
								} else {
									dialogInner.innerHTML = "Posts should only be reported for reasons listed in the <a href=\"/_/articles/info/\" target=\"_blank\">FAQ</a>.<br>Remember: This is not 4chan, so 4chan's rules do not apply here.";
								}
								
								dialogInner.classList.add("edited");
							}
						}
					},
					
					(200)
				);
			}
		},
		
		stopThreadUpdater: function () {
			if (_this.props.isInBoard && _this.props.boardIsArchive) {
				Object.defineProperty(
					window,
					"enableRealtimeThread",
					{
						value: function () { },
						writable: false
					}
				);
			}
		},
		
		fixSauceLinks: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(function (target) {
					target.querySelectorAll(".post_file_controls > a")
						.forEach(
							function (sauce) {
								if (sauce.protocol === "http:") sauce.protocol = "https:";
								if (sauce.host === "google.com") sauce.host = "www.google.com";
							}
						);
				});
			}
		},
		
		fixBacklinkHash: function () {
			var linkPost;
			var linkBoard;
			var linkNumber;
			
			if (_this.props.isInThread) {
				_this.runOnAll(function (target) {
					target.querySelectorAll("article a.backlink")
						.forEach(
							function (link) {
								linkBoard = link.dataset.board;
								linkNumber = link.dataset.post;
								
								if (
									linkBoard &&
									linkNumber &&
									linkBoard === _this.props.boardNameShort
								) {
									linkPost = document.querySelector("article[id=\"" + linkNumber + "\"]");
									
									if (
										linkPost !== null &&
										linkPost.dataset.board == linkBoard &&
										linkPost.dataset.number == linkNumber
									) {
										link.href = ("#" + linkNumber);
									}
								}
							}
						);
				});
			}
		},
		
		fixMoonRuneFont: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(
					function (target) {
						target.querySelectorAll(".text.shift-jis")
							.forEach(
								function (item) {
									item.classList.remove("shift-jis");
								}
							);
					}
				);
			}
		},
		
		addThreadComments: function () {
			if(!window.localStorage.getItem("wtf")) return;
			
			var topicBoard;
			var topicNumber;
			var controls;
			var comThread;
			var comScript;
			
			if (window.localStorage.getItem("comments") == null) {
				window.localStorage.setItem("comments", "1");
			}
			
			if (_this.props.isInThread) {
				topicBoard = _this.props.boardNameShort;
				topicNumber = _this.props.curThreadNumber;
				
				if (topicBoard && topicNumber) {
					window.disqus_config =
						function () {
							this.page.url = (_this.props.vars.default_url + topicBoard + "/thread/" + topicNumber + "/");
							this.page.identifier = [window.location.hostname, "topic", topicBoard, topicNumber].join("/");
							this.page.title = ("Topic /" + topicBoard + "/" + topicNumber);
						};
					
					controls = document.createElement("li");
					controls.appendChild(document.createElement("label"));
					controls.children[0].style.cursor = "pointer";
					controls.children[0].style.padding = "11px 10px";
					controls.children[0].style.paddingLeft = "30px";
					controls.children[0].style.marginBottom = "0";
					controls.children[0].style.color = "0";
					controls.children[0].appendChild(document.createElement("input"));
					controls.children[0].appendChild(document.createTextNode("Enable Thread Comments"));
					controls.children[0].children[0].type = "checkbox";
					controls.children[0].children[0].checked = false;
					controls.children[0].children[0].style.marginTop = "-1px";
					controls.children[0].children[0].style.marginRight = "5px";
					
					/*comThread = document.createElement("div");
					comThread.id = "disqus_thread";
					comThread.style.display = "none";
					comThread.style.marginTop = "20px";
					comThread.style.marginBottom = "3px";
					comThread.style.paddingLeft = "30px";
					comThread.style.paddingRight = "30px";
					
					comScript = document.createElement("script");
					comScript.src = "https://arch-b4k-co.disqus.com/embed.js";
					comScript.setAttribute("data-timestamp", (+new Date()));*/
					
					comThread = document.createElement("div");
					comThread.id = "commento";
					comThread.style.display = "none";
					comThread.style.marginTop = "20px";
					comThread.style.marginBottom = "3px";
					
					comScript = document.createElement("script");
					comScript.src = "https://commento.b4k.co/js/commento.js";
					comScript.setAttribute("data-page", ("/" + topicBoard + "/thread/" + topicNumber + "/"));
					
					if (window.localStorage.getItem("comments") === "1") {
						controls.children[0].children[0].checked = true;
						comThread.style.display = "";
					}
					
					document.querySelectorAll("ul.nav")[1].appendChild(controls);
					document.querySelector("article.thread").appendChild(comThread);
					
					controls.children[0].style.color =
						window.getComputedStyle(controls.previousElementSibling.children[0]).color;
					
					if (window.localStorage.getItem("comments") === "1") {
						document.querySelector("head").appendChild(comScript);
					}
					
					controls.querySelector("input")
						.addEventListener(
							"change",
							function (event) {
								window.localStorage.setItem("comments", (event.target.checked ? "1" : "0"));
								
								disThread.style.display = (event.target.checked ? "" : "none");
								
								if (event.target.checked) {
									if (comScript.parentElement == null) {
										document.querySelector("head").appendChild(comScript);
									}
								}
							}
						);
				}
			}
		},
		
		fixScriptErrors: function () {
			var hash;
			var temp;
			
			hash = location.href.split(/#/)[1];
			hash = (hash != null ? hash : "");
			hash = hash.replace("q", "");
			
			if (hash) {
				if (document.getElementById(hash) == null) {
					temp = document.createElement("span");
					temp.id = hash;
					temp.hidden = true;
					temp.style.position = "absolute";
					temp.style.top = "0";
					temp.style.left = "0";
					
					document.body.appendChild(temp);
				}
			}
		},
		
		hidePostButtons: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(
					function (target) {
						target.querySelectorAll(".post_controls > a.btnr")
							.forEach(
								function (item) {
									if (item.textContent === "Delete") item.hidden = true;
									if (item.textContent === "Reply" && _this.props.boardIsArchive == true) item.hidden = true;
									if (item.textContent === "Original" && _this.props.boardIsArchive == false) item.hidden = true;
								}
							);
					}
				);
			}
		},
		
		doSearchRedirect: function () {
			return; // this belongs in a userscript instead
			
			if (
				_this.props.isInSearch &&
				document.querySelector("article.post") === null &&
				document.querySelector("meta[http-equiv]") === null
			) {
				switch (_this.props.boardNameShort) {
					default: break;
					case "mlp": window.location.hostname = "desuarchive.org"; break;
				}
			}
		},
		
		stopLinkReferrers: function () {
			if (_this.props.isInPostView) {
				_this.runOnAll(
					function (target) {
						target.querySelectorAll(".text a[target=\"_blank\"]")
							.forEach(
								function (item) {
									item.referrerPolicy = "same-origin";
								}
							);
					}
				);
			}
		},
		
		addSearchLimitationNote: function () {
			return;
			
			var tmp1;
			var tmp2;
			
			if (_this.props.isInSearch) {
				tmp1 = document.querySelector("#main > h3.section_title");
				
				if (tmp1) {
					tmp2 = document.createElement("small");
					tmp2.style = "margin-left: 10px";
					
					tmp2.textContent = "Note: /v/ search goes back 1 year, /vg/ goes back 3 months.";
					
					tmp1.appendChild(document.createTextNode(" "));
					tmp1.appendChild(tmp2);
				}
			}
		},
		
		changeLastFiftyToHundred: function() {
			// thread buttons
			document.querySelectorAll(".post_controls > a.btnr")
				.forEach(
					function (item) {
						if (item.textContent === "Last 50") {
							item.textContent = "Last 100";
							item.href = item.getAttribute("href").replace("/last/50/", "/last/100/");
						}
					}
				);
			
			// thread too big alert
			document.querySelectorAll(".alert > a")
				.forEach(
					function (item) {
						if (item.textContent === "view last 50 posts") {
							item.textContent = "view last 100 posts";
							item.href = item.getAttribute("href").replace("/last/50/", "/last/100/");
						}
					}
				);
		},
		
		searchThreadStats: function() {
			var topics;
			var query;
			var tmp1;
			var tmp2;
			
			if (_this.props.isInSearch) {
				topics = [];
				
				document.querySelectorAll("article.post.post_is_op")
					.forEach(
						function (item) {
							topics.push({
								"element": item,
								"board": item.dataset.board,
								"number": item.dataset.number
							})
						}
					);
				
				if (topics.length > 0) {
					query = "";
					
					topics.forEach(
						function (item) {
							query = (query + (query.length > 0 ? "," : "") + item.board + "." + item.number);
						}
					);
					
					jQuery.ajax({
						url: "https://b4k.co/4chan-arch-api.php",
						method: "get",
						dataType: "json",
						
						data: {
							"act": "replies",
							"topics": query
						},
						
						success: function (data, textStatus, jqXHR) {
							if (data) {
								data.forEach(
									function (item1) {
										topics.forEach(
											function (item2) {
												if (
													item1.board == item2.board,
													item1.number == item2.number
												) {
													tmp1 = item2.element.querySelector(".post_file");
													
													if (tmp1) {
														tmp2 = document.createElement("span");
														tmp2.textContent = ("Replies: " + (item1.cnt_reply - 1));
														tmp2.style.marginLeft = "7px";
														
														tmp1.appendChild(tmp2);
													}
												}
											}
										);
									}
								);
							}
						}
					});
				}
			}
		}
	};
};
