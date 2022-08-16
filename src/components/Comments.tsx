export const Comments = () => {
  return (
    <section
      style={{ width: '100%' }}
      ref={(element) => {
        if (!element) {
          return;
        }

        const scriptElement = document.createElement('script');
        scriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        scriptElement.setAttribute('repo', 'szkkng/kengo-dev');
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('theme', 'github-dark');
        scriptElement.setAttribute('crossorigin', 'anonymous');
        scriptElement.setAttribute('async', 'true');
        element.replaceChildren(scriptElement);
      }}
    />
  );
};
