import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

def barChars():
    # Read your data from file
    file = "combined_data_for_histogram.json"
    df = pd.read_json(file, orient='records')

    # Define your grouping categories
    groups = ["7JSON", "7XML", "100JSON", "100XML", "1000JSON", "1000XML", "2000JSON", "2000XML"]

    # Width of the bars
    barWidth = 0.3

    # Initialize lists to store bar data and error intervals for each group
    barsData = []
    barsInterval = []

    # Iterate over groups and calculate mean and standard error for each group
    for group in groups:
        group_data = df[group]
        barsData.append(group_data.mean() / 1000)  # Convert from ms to seconds
        barsInterval.append(group_data.std() / 1000)  # Convert from ms to seconds

    # The x-position order of bars
    barsOrder = np.arange(len(groups) // 2)  # Adjusted for pairs of XML and JSON

    # Colours of bar charts
    colors = ["#fA00ff", "#6fff79"]

    # Opacity of colours
    Opacity = 1

    # Interval cap size
    intervalCapsize = 7

    # Plot bars for each group
    for i in range(0, len(groups), 2):
        plt.bar(barsOrder[i // 2] - barWidth / 2, barsData[i], color=colors[0],
                edgecolor='black', width=barWidth, yerr=barsInterval[i],
                capsize=intervalCapsize, alpha=Opacity, label="JSON" if i == 0 else "_nolegend_")

        plt.bar(barsOrder[i // 2] + barWidth / 2, barsData[i + 1], color=colors[1],
                edgecolor='black', width=barWidth, yerr=barsInterval[i + 1],
                capsize=intervalCapsize, alpha=Opacity, label="XML" if i == 0 else "_nolegend_")

    # Put a tick on the x-axis under each pair of bars and label it with data size
    plt.xticks(barsOrder, ["7", "100", "1000", "2000"])
    plt.ylabel('Average load time (seconds)')  # Change ylabel to seconds
    plt.xlabel('Number of articles')
    plt.title('Histogram with all measurements (mixed, standard deviation)')
    plt.legend()

    # Set the y-axis limit
    plt.ylim(0, 0.35)  # Adjusted for seconds

    plt.show()

barChars()