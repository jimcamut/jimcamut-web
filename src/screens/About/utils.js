export const sluggify = str => str.toLowerCase().replace(/\s/gi, '-');

export const loadTOC = parentClass => {
  const $toc = document.querySelector(`.${parentClass} .table-of-contents`);
  if (!$toc.querySelector('h3')) {
    $toc.innerHTML = '';
    const $title = document.createElement('h3');
    $title.innerText = 'Table of Contents';
    $toc.appendChild($title);

    const $list = document.createElement('ol');
    const $content = document.querySelector(`.${parentClass} .content`);
    const $headings = $content.querySelectorAll('h2');

    $headings.forEach($heading => {
      const slug = sluggify($heading.innerText);
      $heading.id = slug;

      const $listItem = document.createElement('li');
      $listItem.innerHTML = `<a href="#${slug}">${$heading.innerText}</a>`;
      $list.appendChild($listItem);
    });
    $toc.appendChild($list);
  }
};
