const repositoryList = document.querySelector("#repository-list");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  if (!Array.isArray(repositories) || repositories.length === 0) {
    repositoryList.innerHTML = '<li class="status-message">No starred repositories yet.</li>';
    return;
  }

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const heading = document.createElement("h3");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    heading.append(link);

    item.append(heading);

    if (repository.description) {
      const description = document.createElement("p");
      description.textContent = repository.description;
      item.append(description);
    }

    if (repository.starred_at) {
      const date = document.createElement("time");
      date.dateTime = repository.starred_at;
      date.textContent = `Starred on ${repository.starred_at}`;
      item.append(date);
    }

    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    renderRepositories(await response.json());
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    repositoryList.innerHTML =
      '<li class="status-message">Could not load starred repositories. Please try again later.</li>';
  }
}

loadRepositories();
