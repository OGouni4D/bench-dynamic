var nsmall = 100;
var nmedium = 10000;
var nlarge = 1000000;

/*

// common
getBenchUtils().generateData("BasicLink", nsmall, true);

// Basic
getBenchUtils().generateData("BasicReadSmall", nsmall, false);
getBenchUtils().generateData("BasicReadMedium", nmedium, false);
getBenchUtils().generateData("BasicReadLarge", nlarge, false);

// Complex
getBenchUtils().generateData("ComplexReadSmall", nsmall, false);
getBenchUtils().generateData("ComplexReadMedium", nmedium, false);
getBenchUtils().generateData("ComplexReadLarge", nlarge, false);

*/

// Filter and order by
getBenchUtils().generateFilterAndOrderByData("FilterAndOrderBySmall", nsmall*2, false);
getBenchUtils().generateFilterAndOrderByData("FilterAndOrderByMedium", nmedium, false);
getBenchUtils().generateFilterAndOrderByData("FilterAndOrderByLarge", nlarge, false);