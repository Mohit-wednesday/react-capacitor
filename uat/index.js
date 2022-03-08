export async function redirect() {
  let pathname = window.location.pathname;

  if (['', '/', '/index.html'].includes(pathname)) {
    return;
  }
  if (pathname.includes('/index.html')) {
    pathname = pathname.replace('/index.html', '');
  }

  const pathnames = pathname.split('/').filter((val) => val !== '');
  let loopCount = pathnames.length;

  // /feat/uat/tracks/123

  // 4 => 3,2,1

  for (let k = loopCount - 1; k > 0; k--) {
    // remove empty strings in the edges after split
    let newPathname = '';
    for (let i = 0; i < k; i++) {
      newPathname += `/${pathnames[i]}`;
    }

    let updatedUrl = window.location.origin + newPathname;
    const res = await fetch(updatedUrl);
    if (res.ok) {
      window.location.assign(updatedUrl + '/index.html' + `?redirect_uri=${pathname.replace(newPathname, '')}`);
      return;
    }
  }

  window.location.assign(window.location.origin + '/index.html');
}

redirect();
