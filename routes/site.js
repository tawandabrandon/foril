function Site(domain,hits,hitAverage) {
	this.domain = domain;
	this.hits = hits;
	this.reputation = hitAverage;
}
module.exports = Site;