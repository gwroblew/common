"use strict";
/*global TextRectangle, Element, NodeList: true*/

// Adds several helper methods to the built in DOM elements
if(typeof Element!=="undefined")
{
	Element.prototype.getComputedStyle = function getComputedStyle()
	{
		return window.getComputedStyle(this);
	};

	Element.prototype.getXY = function getXY()
	{
		const r=this.getBoundingClientRect();
		return [r.left, r.top];
	};

	Element.prototype.getWidthHeight = function getWidthHeight()
	{
		return this.getDim();
	};

	Element.prototype.getDim = function getDim()
	{
		const r = this.getBoundingClientRect();
		return [r.width, r.height];
	};

	Element.prototype.clear = function clear()
	{
		this.innerHTML = "";
	};

	if(!Element.prototype.remove)
	{
		Element.prototype.remove = function remove()
		{
			if(this.parentNode!==null)
				this.parentNode.removeChild(this);
		};
	}

	Element.prototype.setText = function setText(text)
	{
		if(!this.childNodes || this.childNodes.length!==1)
		{
			this.clear();
			this.appendChild(document.createTextNode(text));
			return this;
		}

		this.childNodes[0].nodeValue = text;

		return this;
	};

	// Returns the first ancestor that the passed in function returns true to upon receiving it passed in
	Element.prototype.getAncestor = function getAncestor(f)
	{
		for(let c=this;c;c=c.parentNode)	// eslint-disable-line consistent-this
		{
			if(f(c))
				return c;

			if(c.nodeName.toLowerCase()==="html")
				return null;
		}

		return null;
	};

	// Returns the width of one em for this element
	Element.prototype.getEmWidth = function getEmWidth()
	{
		return Number(this.getComputedStyle().fontSize.match(/(\d+(\.\d+)?)px$/)[1]);
	};

	// Returns the elements width
	Element.prototype.getWidth = function getWidth()
	{
		return this.getBoundingClientRect().width;
	};

	// Returns the elements height
	Element.prototype.getHeight = function getHeight()
	{
		return this.getBoundingClientRect().height;
	};

	// Returns the elements computed padding width
	Element.prototype.getPaddingWidth = function getPaddingWidth()
	{
		const cs = this.getComputedStyle();
		return (parseFloat(cs.paddingLeft)+parseFloat(cs.paddingRight));
	};

	// Returns the elements computed padding height
	Element.prototype.getPaddingHeight = function getPaddingHeight()
	{
		const cs = this.getComputedStyle();
		return (parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom));
	};

	// Returns the elements computed margin width
	Element.prototype.getMarginWidth = function getMarginWidth()
	{
		const cs = this.getComputedStyle();
		return (parseFloat(cs.marginLeft)+parseFloat(cs.marginRight));
	};

	// Returns the elements computed margin height
	Element.prototype.getMarginHeight = function getMarginHeight()
	{
		const cs = this.getComputedStyle();
		return (parseFloat(cs.marginTop)+parseFloat(cs.marginBottom));
	};

	// Disables the element by setting the disabled attribute and class
	Element.prototype.disable = function disable()
	{
		this.classList.add("disabled");
		this.setAttribute("disabled", "disabled");
	};

	// Enables the element by removing the disabled attribute and class
	Element.prototype.enable = function enable()
	{
		this.classList.remove("disabled");
		this.removeAttribute("disabled");
	};

	// Safely scrolls the element into view. Currently only supports vevrtical movement.
	// .scrollIntoView should always be avoided due to it moving the whole darn screen if anything at all is offscreen. Piece of junk that function is.
	Element.prototype.safeScrollIntoView = function safeScrollIntoView(scrollParent)
	{
		const thisHeight = this.getHeight();
		const thisBottomOffset = (this.offsetTop + thisHeight);
		if(scrollParent.scrollTop>thisBottomOffset || (scrollParent.scrollTop+scrollParent.getHeight())<thisBottomOffset)
			scrollParent.scrollTop = this.offsetTop - ((scrollParent.getHeight()-thisHeight)/2);
	};
}

// Adds width/height properties to getBoundingClientRect for IE8
if("TextRectangle" in window && !("width" in TextRectangle.prototype))
	Object.defineProperties(TextRectangle.prototype, { "width" : { get : function() { return this.right-this.left; } }, "height" : { get : function() { return this.bottom-this.top; } } });	// eslint-disable-line object-shorthand
